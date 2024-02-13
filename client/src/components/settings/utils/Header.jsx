import { ArrowLeft } from 'phosphor-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='flex gap-2 p-5 items-center shadow-sm'>
        <Link to="/">
        <ArrowLeft className='text-xl font-semibold cursor-pointer'/>
        </Link>
        <span className='text-xl font-semibold'>Settings</span>
    </div>
  )
}

export default Header