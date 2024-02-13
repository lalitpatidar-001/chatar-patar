import { Divider } from '@mui/material'
import { GithubLogo, GoogleLogo, LinkedinLogo, TwitterLogo } from 'phosphor-react'
import React from 'react'

const AuthSocial = () => {
    return (
        <div className='w-full flex flex-col gap-4'>

            {/* divider */}
            <div className='flex items-center gap-1'>
                <span className='w-full h-[1px] border' />
                <span className='text-gray-500 text-sm '>
                    OR
                </span>
                <span className='w-full h-[1px] border' />
            </div>

            {/* actions */}
            <div className='flex gap-4 justify-center'>
                    <button className='p-2 bg-gray-100 rounded-full hover:bg-sky-200'><GoogleLogo color='#df3e30'/></button>
                    <button className='p-2 bg-gray-100 rounded-full hover:bg-sky-200'><GithubLogo/></button>
                    <button className='p-2 bg-gray-100 rounded-full hover:bg-sky-200'><TwitterLogo color='#1c9cea'/></button>
            </div>

        </div>
    )
}

export default AuthSocial