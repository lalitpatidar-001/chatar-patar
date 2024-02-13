import React from 'react'
import { actions } from './action'

const Actions = () => {
  return (
    <div className='bg-red fixed z-40 bottom-[55px] flex flex-col gap-2 '>
    {actions.map((item)=>(
         <div
         className={` 
         bg-[#5B96F7]
         dark:bg-[#171a21]
         text-black
        dark:text-white
          p-1 rounded 
          text-[18px]
          cursor-pointer
        hover:text-blue-500
          transition-all
          duration-300
         `}
         >
        {item.icon}
         </div>
    ))}
    </div>
  )
}

export default Actions