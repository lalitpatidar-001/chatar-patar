import React from 'react'
import AuthInfo from '../../components/auth/AuthInfo'
import { Link } from 'react-router-dom'
import RegisterForm from '../../components/auth/RegisterForm'
import AuthSocial from '../../components/auth/AuthSocial'

const Registeration = () => {
    return (
        <div className='flex flex-col items-center gap-2'>

            <div className='lg:w-[35%] flex flex-col gap-3'>

                {/* register info */}
                <AuthInfo
                    heading="Register to Chatar-Patar"
                    path="/auth/login"
                    text="Already User?"
                    linkText="Login here"
                />

                {/* register form */}
                <RegisterForm/>

                {/* term and condition */}
                <div className='flex gap-1 text-gray-700'>
                    <span>By signining up, I agree to </span>
                    <Link className="underline text-gray-600 cursor-pointer">Term&Service</Link>
                    <span>{" and "}</span>
                    <Link className="underline text-gray-600 cursor-pointer"> Privacy Policy</Link>
                </div>

                {/* auth socials */}
                <AuthSocial/>
            </div>
        </div>
    )
}

export default Registeration