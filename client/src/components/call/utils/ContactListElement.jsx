import {  ArrowDownLeft, ArrowUpRight, Phone, PhoneCall, VideoCamera } from 'phosphor-react'
import React from 'react'


function ContactListElement({img, incoming , missed}) {
    return (
        <div className='w-full rounded-lg bg-[#FFFFFF] 
        dark:bg-[#171a21]  items-center flex px-1 justify-between p-2 pr-3 '>
            {/* left */}
            <div className='flex  gap-2 items-center'>
                {/* image */}
                <div 
                className='relative'>
                    <img className='h-12 w-12 rounded-full' src={img} />
                    <div className='absolute bg-green-500 h-2 w-2 rounded-full right-[4px] bottom-[4px] border-[1px] '></div>
                </div>
                {/* name and msg */}
                <div className='flex flex-col '>
                    <h3 className='text-sm font-[700]'>lalit patidar</h3>

                    {/* incoming or ougoing / missed arrow */}
                    {/* <div className='flex gap-2  items-center'>
                   { incoming ?<ArrowDownLeft className={`mt-[2px] ${missed?"text-red-500":"text-green-500"}`}/>
                    :
                    <ArrowUpRight className={`mt-[2px] ${missed?"text-red-500":"text-green-500"}`}/>}
                    
                    <span className='text-[#7C7C7D] text-sm'>yesterday 21:22</span>
                    </div> */}
                </div>
            </div>

            {/* right */}
            <div className=' flex gap-2'>
                 <Phone className={`text-green-500 text-xl cursor-pointer`}/>
                 <VideoCamera className={`text-green-500 text-xl cursor-pointer`}/>
            </div>


        </div>
    )
}

export default ContactListElement