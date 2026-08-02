import express from "express";
import { registerUser } from "../controllers/registerUser.js";
import { loginUser } from "../controllers/loginUser.js";
import { getUserByEmail, getUser, uploadChatBg, uploadChatBgOpacity, uploadChatFont, verifyEmail, forgotPassword, resetPassword, uploadAvatar } from "../controllers/users.js";
import { authMiddleware } from "../middleware/auth.js";
import { refreshAccessToken } from "../controllers/refreshToken.js";
import upload from "../middleware/upload.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshAccessToken);
router.get("/verify", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/lookup", authMiddleware, getUserByEmail);

router.use("/me", authMiddleware);

router.get("/me", getUser);
router.post("/me/chat-bg", upload.single("chat-bg"), uploadChatBg);
router.post("/me/avatar", upload.single("avatar"), uploadAvatar);
router.post("/me/chat-bg-opacity", uploadChatBgOpacity);
router.post("/me/chat-font", uploadChatFont);
export default router;