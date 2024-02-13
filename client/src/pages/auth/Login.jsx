import React from 'react'
import { Link } from 'react-router-dom'
import AuthInfo from '../../components/auth/AuthInfo'
import AuthSocial from '../../components/auth/AuthSocial'
import LoginForm from '../../components/auth/LoginForm'

const Login = () => {
    return (
        <div className='flex flex-col items-center gap-2 w-full' >

            <div className='lg:w-[35%] flex flex-col gap-3'>
                {/* login info */}
                <AuthInfo
                    heading="Login to Chatar-Patar"
                    path="/auth/register"
                    linkText="Create an account"
                    text="New User?"
                />

                {/* login form */}
                <LoginForm/>
                {/* auth socials */}
                <AuthSocial />

            </div>
        </div>
    )
}

export default Login