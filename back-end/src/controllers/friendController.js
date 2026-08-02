import prisma from "../db.js";
//get /friends
export const getFriends = async (req, res) => {
    const userId = req.user.userId;
    const users = await prisma.friendRequest.findMany({
        where: {
            status: "accepted",
            OR: [{senderId: userId}, {receiverId: userId}]
        },
        include: {
            sender: true,
            receiver: true
        }
    });
    const friends = users.map((r) => {
        r.senderId === userId ? r.receiver : r.sender;
    })
    res.json(friends);
}
//get /friends/requests
export const getPendingRequests = async (req, res) => {
    const userId = req.user.userId;
    const requests = await prisma.friendRequest.findMany({
        where: {
            status: "pending",
            receiverId: userId
        },
        include: {
            sender: true
        }
    });
    res.json(requests);
}
//POST /friends/request {receiverId}
export const sendFriendRequest = async (req,res) => {
    const senderId = req.user.userId;
    const {receiverId} = req.body;

    if(senderId === receiverId){
        return res.status(400).json({error: "Can't friend yourself xd"});
    }
    try {
        const request = await prisma.friendRequest.create({
            data: {
                senderId, receiverId
            }
        });
        req.io.to(receiverId).emit("friendRequestReceived", request);
        res.status(201).json(request);
    } catch(err){
        console.error(err);
        res.status(400).json({error: "Request already exists"});
    }
};
//PATCH /friends/request/:id/accept
export const acceptFriendRequest = async (req, res) => {
    const {id} = req.params;
    const request = await prisma.friendRequest.findUnique({where: {id}});
    if(!request || request.receiverId != req.user.userId){
        return res.status(403).json({error: "Not allowed"});
    }
    const room = await prisma.$transaction(async (tx) => {
        await tx.friendRequest.update({
            where: {id},
            data: {status: "accepted"}
        });
        return tx.room.create({
            data: {
                name: `dm-${request.senderId}-${request.receiverId}`,
                isDM: true,
                members: {
                    create: [{userId: request.senderId}, {userId: request.receiverId}]
                }
            },
            include: {members: {include: {user: true}}}
        });
    });
    req.io.to(request.senderId).emit("friendRequestAccepted", room);
    req.io.to(request.receiverId).emit("friendRequestAccepted", room);
    res.json(room);
}
//PATCH /friends/request/:id/reject
export const rejectFriendRequest = async (req, res) => {
    const {id} = req.params;
    try {
    const request = await prisma.friendRequest.findUnique({where:{id}});
    if(!request || request.receiverId !== req.user.userId) return res.status(403).json({error: "Not allowed"});
    const updated = await prisma.friendRequest.update({
        where: {id},
        data: {status: "rejected"}
    });
    req.io.to(request.senderId).emit("friendRequestRejected", updated);
    return res.json(updated);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error: "Something went wrong"});
    }

}