import express from "express";
import {createServer} from "http";
import {Server} from "socket.io";
import jwt from "jsonwebtoken";
import prisma from "./db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from './routes/auth.js';
import friendRoutes from "./routes/friendRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import "dotenv/config";
import { authMiddleware } from "./middleware/auth.js";
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {cors: {origin: "http://localhost:5173", credentials: true}});

io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = decoded.id;
        next();
    } catch {
        next(new Error("Invalid token"));
    }
});

io.on("connection", (socket) => {
    socket.join(socket.userId);

    socket.on("joinRoom", (roomId) => socket.join(roomId));
    socket.on("sendMessage", async ({roomId, content}) => {
        const message = await prisma.message.create({
            data: {content, roomId, authorId: socket.userId},
            include: {author: true}
        });
        io.to(roomId).emit("newMessage", message);
    });
});



app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(cookieParser());
app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/users', userRoutes);
app.use('/friends', authMiddleware, friendRoutes);
app.use("/rooms", authMiddleware, roomRoutes);
app.use("/uploads", express.static("uploads"));
app.get('/', (req, res) => {
    res.send('hello world');
});

httpServer.listen(3000, () => {
    console.log("Server running on port 3000");
});