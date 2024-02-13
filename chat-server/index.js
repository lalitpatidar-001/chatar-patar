const app = require("./app.js")
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io"); // socket
const path = require('path');

// models imports
const User = require("./models/User.js");
const FriendRequest = require("./models/FriendRequest.js");
const OneToOneMessage = require("./models/OneToOneMessage.js");
const Message = require("./models/Message.js");

//router imports
const authRouter = require("./routers/auth.js");
const userRouter = require("./routers/user.js");

//router middleware
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

// event imports
const { sendFriendRequestEvent, acceptFriendRequestEvent } = require("./chat-services/friendRequestEvents.js");
const { getAllChatListEvent, startNewConversation, getAllParticipants } = require("./chat-services/chatEvents.js");
const { getAllMessages, sendTextMessage, newMessageRead, newMessageNotRead, allMessageSeen, getUserLastMessage } = require("./chat-services/messageEvents.js");
const { socketDisconnected, userCameOnline } = require("./chat-services/connectionEvents.js");




const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

mongoose.connect(process.env.DB_URL)
    .then(() => console.log("DB Connected..."))
    .catch((error) => console.log("DB Error", error));

server.listen(process.env.PORT || 4000, () => console.log("server is running..."));


// SOCKET EVENT LISTNERS
io.on("connection", async (socket) => {
    console.log("new user connected ")
    const userId = socket.handshake.query["user_id"]; 
    const socket_id = socket.id
    if (Boolean(userId)) {
        await User.findByIdAndUpdate(userId, { socket_id, status: "Online" })
        console.log("user retieved")
    }


    // USER CAME ONLINE
    socket?.on("user_came_online",(data)=>userCameOnline(data,socket) );

    // GET USERS LAST MESSAGE 
    socket?.on("get_last_message",(data,callback)=>getUserLastMessage(data,callback)) 

    // SEND FREIND REQUEST
    socket.on("friend_request",(data) => sendFriendRequestEvent(data, io))

    // ACCEPT FRIEND REQUEST
    socket.on("accept-request",(data)=>acceptFriendRequestEvent(data,io))

    // GET ALL CHATS OF USER
    socket.on("get_direct_conversatoins",(data,callback)=>getAllChatListEvent(data,callback));

    // START A NEW CONVERSATION IF NOT EXIST
    socket.on("start_conversation",(data)=>startNewConversation(data,socket) );

    // GET ALL MESSAGES OF CONVERSATION
    socket.on("get_messages",(data,callback)=>getAllMessages(data,callback))

    // GET PARTICIPANTS OF OneToOnEConversation
    socket.on("get_participants", (data,callback)=>getAllParticipants(data,callback));

    // HANDLE INCOMING CHATS (MESSAGES AND LINK)
    socket.on("text_message",(data)=>sendTextMessage(data,io) );

    // seen message --> NEW MESSAGE RECIEVED AND READ 
    socket?.on("new_message_read",(data)=>newMessageRead(data,io) );

    // delivered message --> NEW MESSAGE RECIEVED BUT NOT READ
    socket?.on("new_message_not_read",(data)=>newMessageNotRead(data,io) );

    // all unread messages seen --> ALL MESSAGE OPENED
    socket?.on("message_bar_opened",(data)=>allMessageSeen(data,io));

    // HANDLE CHATS (MEDIA AND DOCUMENT)
    socket.on("file_message", async (data) => {
        console.log('recieved media message', data)

        // data => {to,from,text,file}

        // get the file extension
        const fileExtension = path.extname(data.file.name);

        //generate unique name 
        const fileName = `${Date.now()}_${Math.flore(Math.random() * 1000)}${fileExtension}`

        // upload file

        // create a new converstion if not exist

        //save to Db 

        // emit incoming_message -> to_user

        // emit outgoing_message -> from_user
    });



    // END  CONNECTION on (tab close or logout)
    socket.on("disconnect",(data)=>socketDisconnected(data,socket) )


});



process.on("uncaughtException", (error) => {
    console.log(error);
    process.exit(1);
});

process.on("unhandledRejection", (error) => {
    console.log(error);
    server.close(() => {
        process.exit(1);
    });
})