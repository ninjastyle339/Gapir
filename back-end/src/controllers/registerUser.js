import bcrypt from "bcrypt";
import prisma from "../db.js";
import { Resend } from "resend";
import crypto from "crypto";
import "dotenv/config";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function registerUser(req, res) {
  try {
    const { email, username, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { email, username, password: hashedPassword },
    });

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

    await prisma.verificationToken.create({
      data: { token, userId: newUser.id, expiresAt },
    });

    /*await resend.emails.send({
      from: "onboarding@resend.dev",
      to: newUser.email,
      subject: "Verify email",
      html: `<a href="http://localhost:5173/verify?token=${token}">Click here to verify your email</a>`,
    });*/

    return res.status(201).json({ message: "Account created — check your email to verify" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}