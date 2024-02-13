import React, { useEffect, useRef, useState } from 'react'
import Messages from '../messages/Messages'
import Footer from '../footer/Footer'
import Header from '../Header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { Chat_History } from '../messages/utils'
import { socket } from '../../socket'
import { AddNewCurrentMessage, UpdateCurrentMessages, UpdateScrollUseRef } from '../../redux/slices/conversation'
import axios from '../../utils/axios'


function Conversation() {
  const dispatch = useDispatch();
  const { room_id } = useSelector(state => state.app)
  // console.log("current room id ",room_id)
  const { token } = useSelector(state => state.auth)
  const { sidebar } = useSelector((store) => store.app);
  const [messages, setMessages] = useState([]);
  const [to_userID, setToUserId] = useState(null);
  const [to_user, setToUser] = useState(null);
  const scrollRef = useRef();
  const user_id = window.localStorage.getItem("user_id");


  // message bar opened


  useEffect(() => {
    // geting all chats
    socket?.emit("get_messages", {
      conversation_id: room_id,
      to:user_id
    }, (data) => {
      setMessages(data);
    });
  }, [room_id, socket]);

  useEffect(() => {
    socket?.on("all_messages_read", (data) => {
      console.log("read all messages by user",data);

      if (data.conversation_id === room_id) {
        const updatedMessages = messages.map(message => {
          if (message.status !== "Read" && message.from === user_id) {
            return { ...message, status: "Read" }; // Create a new object with updated status
          }
          return message; // Return the original message if status doesn't need to be updated
        });
  
        setMessages(updatedMessages); // Update the state with the new array
      }
    });
  }, [socket, room_id, messages]); // Include messages in the dependency array
  

  useEffect(() => {
    // recieving  sent message  and added in messages
    // console.log("iddds in use effedr -->",room_id)
    socket?.on("new_message_recieved", (data) => {
      console.log("iddds --> ",data.conversation_id,room_id)
      // console.log("datas ",data.message );
      // console.log("user id ",user_id)
      if (data.conversation_id === room_id ) {
        console.log("new_message_recieved", data)
        setMessages(prevMessages => [...prevMessages, data.message]);
        socket?.emit("new_message_read",{
          conversation_id:room_id,
          message:data.message
        });
      }
      else{
        socket?.emit("new_message_not_read",{
          conversation_id:room_id,
          message:data?.message
        })
      }
    });
    return () => {
      socket?.off("new_message_recieved");
    }
  }, [socket,room_id]);

  useEffect(()=>{
     //  getting message sender sent and added in messages
     socket?.on("new_message_sent", (data) => {
      // console.log("new_message_sent ",data.message)
      // console.log(data.conversation_id,room_id)
      if (data.conversation_id === room_id  ) {
        setMessages(prevMessages => [...prevMessages, data?.message]);
        // dispatch(AddNewCurrentMessage({new_message:data.message}))
      }
    });

    return()=>{
      socket?.off("new_message_sent");
    }
  },[socket,room_id])

  useEffect(() => {
    // getting user id
    console.log("in participants --> room id ",room_id)
    socket?.emit("get_participants",
      { conversation_id: room_id },
      (data) => {
        console.log("data in participants " ,data)
        const to = data.participants?.filter((el) => el.toString() !== user_id)
        if(to?.length>0){
          console.log("usr data -->>",to[0])
          setToUserId(to[0]);
        }
      });
    return () => {
      // socket.off("get_participants");
    }
  }, [socket, room_id]);

  useEffect(() => {
    // user info from backend for header 
    console.log("TOUser Id ",to_userID)
    async function getToUser(to_userID) {
      if (to_userID) {
        const response = await axios.get(`/user/get-user/${to_userID}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });
        // console.log("user -->", response)
        console.log("usrer" ,response.data.data)
        setToUser(response.data.data)
      }
    };
    getToUser(to_userID);
  }, [to_userID,room_id])


    useEffect(() => {
      socket?.on("user_online", ({ online_user }) => {
        console.log("user came online ")
        console.log(online_user , to_user?._id)
        if (online_user === to_user?._id) {
          console.log("came in condition")
          const updatedMessages = messages.map(message => {
            if (message.status === "Sent") {
              return { ...message, status: "Delivered" };
            }
            return message; // Return the original message if status doesn't need to be updated
          });
          setMessages(updatedMessages);
        }
      });
    }, [socket, room_id, messages]); // Include messages in dependency array
  

  useEffect(()=>{
    console.log("message bar oppend ");
    console.log("iddssss" , to_user,user_id)
    socket?.emit("message_bar_opened",{
      to:to_user?._id,
      from:user_id,
      conversation_id:room_id
    });
    return ()=>{
      socket?.off("message_bar_opened")
    }
  },[to_user,user_id,room_id,socket]);





  useEffect(() => {
    // console.log("scrollRef", scrollRef)
    if (scrollRef.current) {
      // console.log("scrooling");
      scrollRef.current.scrollIntoView();
    }
  }, []);
  // scroll to latest last message
  useEffect(() => {
    // console.log("scrollRef", scrollRef)
    if (scrollRef.current) {
      // console.log("scrooling");
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);


  return (
    <div className={` h-screen
    ${sidebar.open ? "w-[calc(100vw-740px)] " : "w-[calc(100vw-420px)] "}
    max-h-[100vh]   flex flex-col bg-[#F0F4FA] dark:bg-[#171a21] `}>
      <Header  {...to_user} /> {/* chat header */}
      {/* messages */}
      <div className='grow-[1]  h-full p-3 flex flex-col gap-5 overflow-y-scroll'>
        {messages?.map((message) => (
          <Messages
            scrollRef={scrollRef}
            el={message} />
        ))
        }
      </div>
      <Footer /> {/*chat footer */}
    </div>
  )
}

export default Conversation