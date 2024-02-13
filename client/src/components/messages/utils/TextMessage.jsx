import React from 'react'
import MessageOptions from './MessageOptions'
import SendOutlined from '@mui/icons-material/SendOutlined'
import MessageStatus from './MessageStatus'
import {format} from "timeago.js"
import {} from "time-js"

const TextMessage = ({ el }) => {
    // console.log("text message ",el)
    const user_id = window.localStorage.getItem("user_id")
    return (
        <div className={`flex  w-full items-center ${el.from === user_id ? "justify-end" : "justify-start"}`}>
            {el.from === user_id && <MessageOptions outgoing={true} />}
            <div className={`p-3 flex items-center relative rounded-xl w-fit ${el.from === user_id ? "bg-[#5B96F7]" : "bg-[#FFFFFF]"}`}>
                <div className='flex gap-1 '>
                    <span className={` ${el.from === user_id ? "" : "dark:text-white"}`}>{el.text}</span>

                    <div className='flex text-[10px]   self-end gap-1 '>
                        <span>{format(el.createdAt)}</span>
                        {el.from === user_id && <span><MessageStatus status={el.status} /></span>}
                    </div>
                </div>
            </div>
            {!el.from === user_id && <MessageOptions  />}
        </div>
    )
}

export default TextMessage