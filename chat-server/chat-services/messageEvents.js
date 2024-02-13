const Message = require("../models/Message");
const User = require("../models/User");

const getAllMessages = async (data, callback) => {
    console.log("get messages called")
    console.log("id", data.conversation_id)
    const result = await Message.updateMany({ status: { $ne: "Read" }, to: data.to }, { $set: { status: "Read" } });
    const messages = await Message.find({ conversation_id: data.conversation_id });
    // console.log("messages",messages)
    callback(messages)
};
const getUserLastMessage = async (data,callback)=>{
    const {conversation_id,to } = data;
    console.log("DATA",data);
    try {
            const lastMessage  = await Message.findOne({conversation_id}).sort({createdAt:-1});
            callback(lastMessage)
    } catch (error) {
        console.log(error)
    }
}
const sendTextMessage = async (data,io) => {
    console.log("RECIEVED MESSAGE ", data);

    const { to, from, text, conversation_id, type } = data
    const to_user = await User.findById(to);
    const from_user = await User.findById(from);

    let new_message = {}
    if (to_user.status === "Offline") {
        new_message = new Message({
            to,
            from,
            conversation_id,
            type,
            text: text,
            status: "Sent"
        })
    } else {
        new_message = new Message({
            to,
            from,
            conversation_id,
            type,
            text: text,
            status: "Delivered"
        })
    }

    // save new message
    const chat = await new_message.save();

    //send message back to sender if reciever is offline 
    if (to_user.status === "Offline") {
        console.log("offline message ")
        io.to(from_user?.socket_id).emit("new_message_sent", {
            conversation_id,
            message: new_message
        })
    }
    // send message to reciever 
    io.to(to_user?.socket_id).emit("new_message_recieved", {
        conversation_id,
        message: chat
    })
    console.log("ran")
};

const newMessageRead = async (data,io) => {
    console.log("new message read ho gya")
    console.log("new_message_read", data);
    const to_user = await User.findById(data.message.to);
    const from_user = await User.findById(data.message.from);
    let { status, ...others } = data.message;
    status = "Read"
    io.to(from_user?.socket_id).emit("new_message_sent", {
        conversation_id: data?.conversation_id,
        message: { ...others, status }
    })

};

const newMessageNotRead = async (data,io) => {
    console.log("new_message_not_read", data);
    const { message } = data;
    const { conversation_id } = message;
    const to_user = await User.findById(data.message.to);
    const from_user = await User.findById(data.message.from);
    console.log("yeh", message)
    io.to(from_user?.socket_id).emit("new_message_sent", {
        conversation_id,
        message: message
    })
};

const allMessageSeen = async (data,io) => {
    console.log("message_bar_oppend", data)
    const { to, from, conversation_id } = data;
    console.log(to, from, conversation_id)
    const to_user = await User.findById(to);
    console.log("user data ", to_user);
    console.log("socket id of to ", to_user?.socket_id)
    io.to(to_user?.socket_id).emit("all_messages_read", {
        to, from, conversation_id,
        message: `messages are read of ${to}`
    });
}

module.exports = {
    getAllMessages,
    sendTextMessage,
    newMessageRead,
    newMessageNotRead,
    allMessageSeen,
    getUserLastMessage

}