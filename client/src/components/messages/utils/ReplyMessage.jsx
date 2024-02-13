import React from 'react'
import MessageOptions from './MessageOptions'

function ReplyMessage({ el }) {
    return (
        <div className={`flex w-full  items-center ${el.incoming ? "justify-start" :  "justify-end"}`}>
         {!el.incoming && <MessageOptions outgoing={true}/>}
           <div className={`w-fit rounded p-2 ${el.incoming ? "justify-start" :  " bg-[#5B96F7] justify-end"}`}>
                {el.message}
           </div>
           {el.incoming && <MessageOptions/>}
        </div>
   
    )
}

export default ReplyMessage