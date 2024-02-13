import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import SideBar from '../components/sidebar/SideBar'
import Chats from '../components/chats/Chats'
import Conversation from '../components/conversatoin/Conversation'
import Contact from '../components/contact/Contact'
import { useDispatch, useSelector } from 'react-redux'
import StarredMessages from '../components/starredMessages/StarredMessages'
import SharedMessages from '../components/sharedMessages/SharedMessages'
import {connectSocket, socket} from "../socket.js";
import { SelectConversation } from '../redux/slices/app.js'
import { AddDirectConversation, UpdateDirectConversation } from '../redux/slices/conversation.js'



function DashBoard() {
    const {isLoggedIn} = useSelector((state)=>state.auth);
    
    const {conversations} = useSelector(state=>state.conversation.direct_chat);

    const dispatch = useDispatch();


    const user_id = window.localStorage.getItem("user_id");
    console.log("user_id",user_id)

    useEffect(()=>{
        if(isLoggedIn){
          window.onload = function(){
            if(!window.location.hash){
              window.location = window.location+'#loaded';
              window.location.reload();
            }
          }
  
          // window.location.reload();
  
          if(!socket){
              connectSocket(user_id)
              console.log("socket",socket)
          }
  
          // LISTEN EVENTS
          // came online
          socket?.emit("user_came_online",{
            user_id
          });


          //1. new-friend-request come
          socket.on("new_friend_request",(data)=>{
            console.log("new friend request event",data.message)
          })
          //2. request-accepted 
          socket.on("request_accepted",(data)=>{
            console.log("request accepted event event",data.message)
          })
          //3. request-sent 
          socket.on("request_sent",(data)=>{
            console.log("request sent event",data.message)
          })

          // start chat
          socket.on("start_chat",(data)=>{
            console.log("start-chat",data)
            const existing_conversation = conversations?.find((el)=>el.id === data._id);

            if(existing_conversation){
                // alredy conversation
                dispatch(
                  UpdateDirectConversation({
                    conversation:data
                  })
                )
            }else{
               // add direct conversation
               dispatch(AddDirectConversation({
                conversation:data
               }))
            }
            dispatch(SelectConversation({
              room_id:data._id
            }))
          });
  
          // REMOVE EVENTS - on component unmount
          return ()=>{
             socket?.off("new_friend_request");
             socket?.off("request_accepted");
             socket?.off("request_sent");
             socket?.off("start_chat");
          }
        } 
    },[isLoggedIn,socket]);
  

    if(!isLoggedIn){
        return <Navigate to="/auth/login"/>
    }

    return (
        <>
            <div className='flex '>
                {/* sidebar */}
                <SideBar />

                {/* <Outlet /> */}
                <Outlet />

            </div>
        </>
    )
}

export default DashBoard