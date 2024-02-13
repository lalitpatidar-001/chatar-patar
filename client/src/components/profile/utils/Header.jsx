import { CaretLeft } from 'phosphor-react'
import React from 'react'

const Header = () => {
    return (
        <div className='flex gap-2 items-center p-5 bg-white  w-full'>
            <CaretLeft />
            <span>Profile</span>
        </div>
    )
}

export default Header