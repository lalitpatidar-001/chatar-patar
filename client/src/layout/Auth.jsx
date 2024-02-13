import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import authImage from '../assets/auth-img.png'
import { useSelector } from 'react-redux';


const Auth = () => {

  const {isLoggedIn} = useSelector((state)=>state.auth);
    if(isLoggedIn){
        return <Navigate to="/"/>
    }
  return (
    <div className='w-full h-screen flex flex-col '>
    <div className='flex justify-center'>
            <div className='flex flex-col items-center'>
                <img className='h-100px] w-[100px] '
                src={authImage}
                />
            </div>
    </div>
    {/* logo */}

    {/* outlet - login/register */}
    <Outlet/>
    </div>
  )
}

export default Auth