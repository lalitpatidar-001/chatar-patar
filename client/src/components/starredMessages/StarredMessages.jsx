import React from 'react'
import Header from './utils/Header'
import Messages from '../messages/Messages'
import { Chat_History } from '../messages/utils'

const StarredMessages = () => {
  return (
    <div className='w-[320px] h-screen 
    dark:bg-[#202630]   '>
      <Header />
      <div className='grow-[1] h-full  p-3 flex flex-col gap-5 overflow-y-scroll'>
        {Chat_History.map((el) => (
          <Messages el={el} />
        ))
        }
      </div>
    </div>
  )
}

export default StarredMessages