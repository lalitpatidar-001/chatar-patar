import React from 'react'
import MessageOptions from './MessageOptions'

function MediaMessage({ el }) {
    return (
        <div className={`flex w-full items-center ${el.incoming ? "justify-start" : "justify-end"}`}>
            <div className={`p-3 rounded-xl w-fit ${el.incoming ? "bg-[#FFFFFF]" : "bg-[#5B96F7]"}`}>
            {!el.incoming && <MessageOptions outgoing={true}/>}
                <div>
                    <img className={`max-h-[210px] rounded-xl`} src={el.img} alt={el.message} />
                    <span className={`${el.incoming ? "" : "dark:text-white"}`}>{el.message}</span>
                </div>

            </div>
            {el.incoming && <MessageOptions/>}
        </div>
    )
}

export default MediaMessage