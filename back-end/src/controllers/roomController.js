import prisma from "../db.js";
//GET /rooms
export const getMyRooms = async (req, res) => {
    const rooms = await prisma.room.findMany({
        where: {members: {some: {userId: req.user.userId}}},
        include: {members: {include: {user: true}}}
    });
    res.json(rooms);
};

//GET /rooms/:roomId/messages
export const getRoomMessages = async (req, res) => {
    const {roomId} = req.params;

    const isMember = await prisma.roomMember.findFirst({
        where: {roomId, userId: req.user.userId}
    });
    if(!isMember) return res.status(403).json({error: "Not a member"});
    const messages = await prisma.message.findMany({
        where: {roomId},
        include: {author: true},
        orderBy: {createdAt: "asc"}
    });
    return res.json(messages);
}
//GET /rooms/:roomId/members
export const getRoomMembers = async (req, res) => {
    const {roomId} = req.params;
    try {
        const isMember = await prisma.roomMember.findFirst({
            where: {roomId, userId: req.user.userId}
        });
        if(!isMember) return res.status(403).json({message: "User not a member"});
        
    const room = await prisma.room.findUnique({
        where: {id: roomId},
        include: {members: {include: {user: true}}}
    });
    if(!room){
        return res.status(404).json({error: "Room not found"});
    }
    return res.json(room.members);
    
    } catch (err){
        console.log(err);
        res.status(500).json({error: "Something went wrong"});
    }
}
