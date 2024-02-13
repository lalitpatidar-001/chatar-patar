import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { SelectConversation } from '../../../redux/slices/app';
import { socket } from '../../../socket';
import {format} from "timeago.js"


function ChatElement({id,name,img,msg,time,unread,online,to_user}) {
    const dispatch = useDispatch();
    const [lastMessage , setLastMessage] = useState(null);


    const handleClickChat = ()=>{
        console.log("room id changed ",id)
        dispatch(SelectConversation({room_id:id}))
    };

    useEffect(()=>{
        socket?.emit("get_last_message",{conversation_id:id,to:to_user},(data)=>{
            console.log("userLastMessage",data)
            setLastMessage(data);
    });
    },[])

    useEffect(() => {
        // recieving  last message 
        socket?.on("new_message_recieved", (data) => {
            console.log("new_message_recievedd", data);
            if(data.conversation_id === id ){
                console.log("setteled")
                setLastMessage(data.message);
                console.log("lastMessage ",lastMessage)
            }
        });
        return () => {
          socket?.off("new_message_recieved");
        }
      }, [socket,lastMessage,id]);

    return (
        <div 
        onClick={handleClickChat}
        
        className='w-full rounded-lg bg-[#FFFFFF] cursor-pointer 
        dark:bg-[#171a21]  items-center flex px-1 justify-between p-2 pr-3 '>
            {/* left */}
            <div className='flex  gap-2 items-center'>
                {/* image */}
                <div className='relative'>
                    <img className='h-12 w-12 rounded-full' src="https://plus.unsplash.com/premium_photo-1674435577971-8c8d50089450?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGhvdG98ZW58MHx8MHx8fDA%3D" />
                   { online && <div className='absolute bg-green-500 h-2 w-2 rounded-full right-[4px] bottom-[4px] border-[1px] '/>}
                </div>
                {/* name and msg */}
                <div className='flex flex-col '>
                    <h3 className='text-sm font-[700]'>{name}</h3>
                    <span className='text-[#7C7C7D] text-sm'>{lastMessage?.text}</span>
                </div>
            </div>

            {/* right */}
            <div className='flex flex-col justify-between '>
                <span className='font-[600] text-[12px] text-[#686768] '>{format(lastMessage?.createdAt)}</span>
                {unread>0 &&<div className='rounded-full bg-[#5B96F7] text-white h-4 w-4 flex items-center justify-center text-[10px]'>{ unread}</div>}
            </div>


        </div>
    )
}

export default ChatElement