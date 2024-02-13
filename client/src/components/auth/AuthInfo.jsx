import React from 'react'
import { Link } from 'react-router-dom'

const AuthInfo = ({heading , linkText, path,text}) => {
  return (
  <>
    <h1 className='text-xl font-semibold text-gray-800 mb-2'>{heading}</h1>
            <div>
                <span className='text-gray-500'>{text}</span>
                <Link to={path} className='text-blue-600 text-md font-semibold'>{linkText}</Link>
            </div>
  </>
  )
}

export default AuthInfo