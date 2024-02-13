import React from 'react'


function ChatElement() {
    return (
        <div className='w-full rounded-lg bg-[#FFFFFF] 
        dark:bg-[#171a21]  items-center flex px-1 justify-between p-2 pr-3 '>
            {/* left */}
            <div className='flex  gap-2 items-center'>
                {/* image */}
                <div className='relative'>
                    <img className='h-12 w-12 rounded-full' src="https://plus.unsplash.com/premium_photo-1674435577971-8c8d50089450?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGhvdG98ZW58MHx8MHx8fDA%3D" />
                    <div className='absolute bg-green-500 h-2 w-2 rounded-full right-[4px] bottom-[4px] border-[1px] '></div>
                </div>
                {/* name and msg */}
                <div className='flex flex-col '>
                    <h3 className='text-sm font-[700]'>lalit patidar</h3>
                    <span className='text-[#7C7C7D] text-sm'>you: thnlx</span>
                </div>
            </div>

            {/* right */}
            <div className='flex flex-col justify-between '>
                <span className='font-[600] text-[12px] text-[#686768] '>9:30</span>
                <div className='rounded-full bg-[#5B96F7] text-white h-4 w-4 flex items-center justify-center text-[10px]'>1</div>
            </div>


        </div>
    )
}

export default ChatElement