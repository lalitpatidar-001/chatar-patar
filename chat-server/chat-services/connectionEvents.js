const Message = require("../models/Message");
const User = require("../models/User");


const socketDisconnected = async (data,socket) => {
    console.log("user disconnected...")
    // find user and set status offline
    if (socket) {
        const user = await User.findOneAndUpdate({ socket_id: socket.id }, { status: "Offline" });
        console.log("user got offline")
    }
    //TODO  broadcast user disconneced to all 
    console.log("closing connection");
    socket.disconnect(0); // close connect for particular socket

};

const userCameOnline = async (data,socket) => {
    const {user_id} = data
    await Message.findOneAndUpdate({ _id: user_id }, { $set: { status: "Delivered" } });

    socket.broadcast.emit("user_online", {
        online_user: user_id
    });
}

module.exports ={
    socketDisconnected,
    userCameOnline
}