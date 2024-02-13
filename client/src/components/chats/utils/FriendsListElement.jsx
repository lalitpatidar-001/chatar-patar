import React from 'react'
import {socket} from "../../../socket.js"
import { Chat } from 'phosphor-react'
import { useDispatch } from 'react-redux';
import { SelectConversation } from '../../../redux/slices/app.js';

const FriendsListElement = ({ firstName, lastName, _id, online, img,id }) => {

    const user_id = window.localStorage.getItem("user_id") 
    
const handleClickChat = ()=>{
    socket?.emit("start_conversation",{
        to:_id,
        from:user_id
    })
}
    

    return (
        <div className='flex items-center justify-between w-[100%] '>
            <div className='flex gap-2 items-center'>
                <div className='w-fit h-fit relative '>
                    <img
                        className='h-12 w-12 rounded-full'
                        src="https://media.istockphoto.com/id/1146517111/photo/taj-mahal-mausoleum-in-agra.jpg?s=612x612&w=0&k=20&c=vcIjhwUrNyjoKbGbAQ5sOcEzDUgOfCsm9ySmJ8gNeRk=" alt="user-profile" />
                        <div className='h-2  w-2  bg-green-500 rounded-full absolute bottom-1 right-1
                        border-[1px] border-white
                        '/>
                </div>
                <span
                    className='font-semibold '
                >{firstName}{" "}{lastName}</span>
            </div>
            <button 
            onClick={handleClickChat}
            className='text-blue-500  flex gap-1 items-center'>Message<Chat/></button>
        </div>
    )
}

export default FriendsListElement