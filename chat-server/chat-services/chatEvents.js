const Message = require("../models/Message");
const OneToOneMessage = require("../models/OneToOneMessage");


const getAllChatListEvent = async (data, callback) => {
    const {user_id} = data
    const existing_conversation = await OneToOneMessage.find({
        participants: { $all: [user_id] },
    }).populate("participants", "firstName lastName _id email status")
     // Process each conversation to add the last message
      

    callback(existing_conversation);
};

const getAllParticipants = async (data, callback) => {
    console.log("get participatns called")
    const { conversation_id } = data;
    console.log("conversation_id", conversation_id)
    const conversation = await OneToOneMessage.findById(conversation_id);
    // console.log("conversation",conversation)
    console.log("conversation.participants", conversation?.participants)
    callback({ participants: conversation?.participants })

}


const startNewConversation = async (data,socket) => {
    const { to, from } = data;

    // check is there any existing conversation
    const existing_conversation = await OneToOneMessage.find({
        participants: {
            $size: 2,
            $all: [to, from]
        }
    }).populate("participants", "firstName lastName _id email status");

    // if no existing conversation
    if (!existing_conversation.length === 0 || !existing_conversation[0]) {
        let new_chat = await OneToOneMessage.create({
            participants: [to, from],
        })

        new_chat = await OneToOneMessage.findById(new_chat._id).populate("participants", "firstName lastName _id email status");

        socket.emit("start_chat", new_chat);
    }
    else {
        console.log("already existing conversation sent")
        socket.emit("start_chat", existing_conversation[0])
    }
}


module.exports = {
    getAllChatListEvent,
    startNewConversation,
    getAllParticipants
}