const FriendRequest = require("../models/FriendRequest");
const User = require("../models/User");


const sendFriendRequestEvent = async (data,io) => {
    console.log("data", data)
    console.log("data to :", data.to);

    const to_user = await User.findById(data.to).select("socket_id"); // freind
    const from_user = await User.findById(data.from).select("socket_id"); // sender

    // add  friend request in db
    await FriendRequest.create({
        sender: data.from,
        recipient: data.to
    });
    // sending freind-request to recipient
    io.to(to_user.socket_id).emit("new_friend_request", {
        // payload
        message: "New friend request recieved"
    });

    // notifing to sender about request
    io.to(from_user.socket_id).emit("request_sent", {
        message: "Request sent successfully"
    });
};


const acceptFriendRequestEvent =  async (data,io) => {
    console.log("accept request data", data);

    const request_doc = await FriendRequest.findById(data.request_id) // find request

    // SENDER AND RECIPIENT DATA
    const sender = await User.findById(request_doc.sender); // getting sender of request
    const recipient = await User.findById(request_doc.recipient); // gettin whom to sended request which accepted

    // UPDATE FRIEND LIST
    // add sender into friends list of recipient
    recipient.friends.push(request_doc.sender)
    // add recipient into friends list of sender
    sender.friends.push(request_doc.recipient)

    //SAVE DATA
    await recipient.save({ new: true, validateModifiedOnly: true });
    await sender.save({ new: true, validateModifiedOnly: true });

    // Delete  Request from db
    await FriendRequest.findByIdAndDelete(data.request_id);

    // Notify Sender and Recipient
    io.to(sender.socket_id).emit("request_accepted", {
        message: "Friend requset accepted successfully"
    })
    io.to(recipient.socket_id).emit("request_accepted", {
        message: "Friend request accepted successfully"
    })
}

module.exports = {
    sendFriendRequestEvent,
    acceptFriendRequestEvent
}