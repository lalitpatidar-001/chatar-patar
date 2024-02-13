import React from 'react'
import {socket} from "../../../socket.js"

const FriendRequestElement = ({ firstName, lastName, _id, online, img,id }) => {

    const handleRequestSend = ()=>{
       socket.emit("accept-request",{
        request_id:id
       },()=>{
        alert("request sent successfully")
       })
    }

    return (
        <div className='flex items-center justify-between w-full'>
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
            onClick={handleRequestSend}
            className='text-blue-500 font-semibold'>Accept Request</button>
        </div>
    )
}

export default FriendRequestElement