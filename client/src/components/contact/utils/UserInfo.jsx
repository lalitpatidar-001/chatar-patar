import { Divider } from '@mui/material'
import { Phone, VideoCamera } from 'phosphor-react'
import React from 'react'


const UserInfo = () => {
    return (
        <div className='flex flex-col gap-6'>
            <div className='flex items-center gap-4'>
                <img
                    className="h-16 w-16 rounded-full"
                    src="https://plus.unsplash.com/premium_photo-1674435577971-8c8d50089450?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGhvdG98ZW58MHx8MHx8fDA%3D" />
                <div className='flex flex-col '>
                    <span className='text-xl font-semibold'>Lalit patidar</span>
                    <span className='text-gray-600 dark:text-white'>+91 7558089122</span>
                </div>
            </div>
            <div className='flex gap-8 items-center justify-evenly
            '>
                <div className='flex flex-col items-center
                cursor-pointer'>
                        <Phone className='text-xl'/>
                        <span>Audio</span>
                </div>
                <div className='flex flex-col items-center
                 cursor-pointer'>
                        <VideoCamera
                            className='text-xl'
                        />
                        <span>Video</span>

                </div>

            </div>

        </div>
    )
}

export default UserInfo