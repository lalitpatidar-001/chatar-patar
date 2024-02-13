import React from 'react'
import MessageOptions from './MessageOptions'
function LinkMessage({ el }) {
  return (
    <div className={`flex w-full  items-center ${el.incoming ? "justify-start" : "justify-end"}`}>
      {!el.incoming && <MessageOptions outgoing={true} />}
      <div className={`w-full rounded p-2 ${el.incoming ? "justify-start" : " bg-[#5B96F7] justify-end"}`}>

        <div className='bg-[#dddddd] p-1 rounded flex gap-2 w-full'>
              <img className="h-20 w-20" src='https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg'/>
              <span>{el.messages}</span>
        </div>

      </div>
      {el.incoming && <MessageOptions />}
    </div>
  )
}

export default LinkMessage