import React, { useState } from 'react'
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import AddLinkOutlinedIcon from '@mui/icons-material/AddLinkOutlined';
import Actions from './Actions';

const ChatInput = ({ openPicker, setOpenPicker,message , setMessage,handleKeyDownOnInput }) => {
    const [actionOpen , setActionOpen] = useState(false);
   


    const handelChanegMessageInput = (e)=>{
        setMessage(e.target.value);
        console.log(message)
    }


    return (
        <div className='flex items-center gap-2 w-full bg-white p-2 rounded-3xl
     dark:bg-[#171a21] '>
            <div className='w-fit'>
                {actionOpen && <Actions /> }
                <div 
                className='cursor-pointer'
                onClick={()=>setActionOpen(!actionOpen)}
                >
                <AddLinkOutlinedIcon />
                </div>
            </div>

            <input 
            onChange={(e)=>handelChanegMessageInput(e)}
            value={message}
            onKeyDown={handleKeyDownOnInput}
            onClick={() => setOpenPicker(false)}
            className='px-3 w-full  outline-none bg-transparent  ' placeholder='message...' type='text' />
            <div className='cursor-pointer' onClick={() => setOpenPicker(!openPicker)}>
                <EmojiEmotionsOutlinedIcon />
            </div>
        </div>
    )
}

export default ChatInput