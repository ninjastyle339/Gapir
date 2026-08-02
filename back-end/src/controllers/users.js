import prisma from "../db.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { Resend } from "resend";
import "dotenv/config";
const resend = new Resend(process.env.RESEND_API_KEY);
export const verifyEmail = async (req, res) => {
  const { token } = req.query;
  try {
    const stored = await prisma.verificationToken.findUnique({ where: { token } });

    if (!stored || stored.expiresAt < new Date()) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: stored.userId },
        data: { emailVerified: true },
      }),
      prisma.verificationToken.delete({ where: { id: stored.id } }),
    ]);

    res.json({ message: "Email verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const forgotPassword = async (req, res) => {
    const {email} = req.body;
    try {
        const user = await prisma.user.findUnique({where: {email}});

        if(!user) return res.json({message: "If that email exists, a reset link was sent"});
        const token = crypto.randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 1000 * 60 * 30);

        await prisma.passwordResetToken.create({
            data: {token, userId: user.id, expiresAt},
        });

        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: user.email,
            subject: "Reset your password",
            html: `<a href="http://localhost:5173/reset-password?token=${token}">Click here to reset your password</a>`
        });
        res.json({message: "If that email exists, a reset link was sent"});
    } catch(err){
        console.error(err);
        res.status(500).json({error: "Something went wrong"});
    }
}
export const resetPassword = async (req, res) => {
    const {token, newPassword} = req.body;
    try {
        const stored = await prisma.passwordResetToken.findUnique({where:{token}});
        if(!stored || stored.expiresAt < new Date()) {
            return res.status(400).json({error: "Invalid or expired token"});
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        await prisma.$transaction([
            prisma.user.update({
                where: {id: stored.userId},
                data: {password: hashedPassword},
            }),
            prisma.passwordResetToken.delete({where: {id: stored.id}}),
            prisma.refreshToken.deleteMany({where: {userId: stored.userId}})
        ]);
        res.json({message: "Password reset successfully"});
    } catch(err) {
        console.error(err);
        res.status(500).json({error: "Something went wrong"});
    }
}



//get /users/lookup?email=someone@example.com
export const getUserByEmail = async (req, res) => {
    const {email} = req.query;
    const user = await prisma.user.findUnique({
        where: {email},
        select: {id: true, username: true, email: true},
    });
    if(!user){
        return res.status(404).json({message: "User not found"});
    }
    return res.status(200).json(user);
}
//get /users/me 
export const getUser = async (req, res) => {
    const id = req.user.userId;
    try { 
    const user = await prisma.user.findUnique({
        where: {id},
        select: {id: true, username: true, email: true, theme: true, avatar: true}
    });
    return res.json(user);
} catch{
    console.log("Couldn't get user");
    }
}
//post /users/me/chat-bg
export const uploadChatBg = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {id: req.user.userId},
            select: {theme: true}
        });
        const bgUrl = `/uploads/${req.file.filename}`;
        const updatedTheme = {...(user.theme || {}), chatBg: bgUrl};

        const updated = await prisma.user.update({
            where: {id: req.user.userId},
            data: {theme: updatedTheme},
            select: {theme: true}
        });
        res.json(updated);
    } catch(err){
        console.error(err);
        res.status(500).json({error: "Something went wrong"});
    }
}
//post /users/me/avatar 
export const uploadAvatar = async (req, res) => {
    try {
        const avatarUrl = `/uploads/${req.file.filename}`;
        const updated = await prisma.user.update({
            where: {id: req.user.userId},
            data: {avatar: avatarUrl},
            select: {avatar: true}
        });
        return res.json(updated);
    } catch(err) {
        console.error(err);
        res.status(500).json({error: "Something weng wrong"});
    }
}
//post /users/me/chat-bg-opacity
export const uploadChatBgOpacity = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {id: req.user.userId},
            select: {theme: true},
        });
        const updatedTheme = {...(user.theme || {}), chatBgOpacity: req.body.opacity};
        const theme = await prisma.user.update({
            where: {id: req.user.userId},
            data: {theme: updatedTheme},
            select: {theme: true}
        });
        res.json(theme);
    } catch(err){
        console.error(err);
        return res.status(500).json({error: "Something went wrong"});
    }
}
//post /users/me/chat-font
export const uploadChatFont = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({where: {id: req.user.userId}, select: {theme: true}});
        const updatedTheme = {...(user.theme || {}), chatFont: req.body.chatFont};
        const theme = await prisma.user.update({
            where: {id: req.user.userId},
            data: {theme: updatedTheme},
            select: {theme: true}
        });
        res.json(theme);
    } catch(err) {
        console.error(err);
        res.status(500).json({error: "Something went wrong"});
    }
}