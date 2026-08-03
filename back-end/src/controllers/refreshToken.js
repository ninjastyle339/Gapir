import prisma from "../db.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import crypto from "crypto";
export async function refreshAccessToken(req, res) {
    const token = req.cookies.refreshToken;
    if(!token) return res.status(401).json({message: "No refresh token"});

    try {
        const stored = await prisma.refreshToken.findUnique({
            where: {token}
        });
        if(!stored || stored.revoked || stored.expiresAt < new Date()){
            return res.status(401).json({message: "Invalid refresh token"});
        }
        const newRefreshToken = crypto.randomBytes(64).toString("hex");
        const expiresAt = new Date(Date.now() + 1000*3600*24*7);
        await prisma.$transaction([
            prisma.refreshToken.update({
                where: {id: stored.id},
                data: {revoked:  true}
            }),
            prisma.refreshToken.create({
                data: {token: newRefreshToken, userId: stored.userId, expiresAt}
            })
        ]);
        const accessToken = jwt.sign(
            {id: stored.userId},
            process.env.JWT_SECRET,
            {expiresIn: "15m"}
        );
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });
        return res.json({accessToken});
    } catch(err){
        console.error(err);
        return res.status(500).json({message: "Something went wrong"});
    }
}