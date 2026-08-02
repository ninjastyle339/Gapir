import prisma from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import crypto from "crypto";

export async function loginUser(req, res) {
    try {
        const {email, password} = req.body;
        const existingUser = await prisma.user.findUnique({
            where: {email}
        });
        if(!existingUser) {
            return res.status(400).json({message: "invalid credentials"});
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if(!isMatch) {
            return res.status(401).json({message: "invalid credentials"})
        }
        const accessToken = jwt.sign(
            {id: existingUser.id},
            process.env.JWT_SECRET,
            {expiresIn: "15m"}
        );
        const refreshToken = crypto.randomBytes(64).toString("hex");
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
        await prisma.refreshToken.create({
            data: {token: refreshToken, userId: existingUser.id, expiresAt},
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(200).json({accessToken});

    } catch(err){
        console.error(err);
        return res.status(500).json({message: "Something went wrong"});
    }
}