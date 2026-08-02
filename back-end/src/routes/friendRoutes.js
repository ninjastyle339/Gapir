import express from "express";
import { getFriends, getPendingRequests, sendFriendRequest, acceptFriendRequest, rejectFriendRequest } from "../controllers/friendController.js";
import { getUserByEmail } from "../controllers/users.js";
const router = express.Router();

router.get("/", getFriends);
router.get("/requests", getPendingRequests);
router.post("/request", sendFriendRequest);
router.patch("/request/:id/accept", acceptFriendRequest);
router.patch("/request/:id/reject", rejectFriendRequest);
export default router;