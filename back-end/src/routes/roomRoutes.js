import { getMyRooms, getRoomMessages, getRoomMembers } from "../controllers/roomController.js";
import express from "express";

const router = express.Router();

router.get("/", getMyRooms);
router.get("/:roomId/messages", getRoomMessages);
router.get("/:roomId/members", getRoomMembers);
export default router;