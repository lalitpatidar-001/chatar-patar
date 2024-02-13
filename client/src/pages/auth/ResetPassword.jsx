import { ArrowLeft } from 'phosphor-react'
import React from 'react'
import { Link } from 'react-router-dom'
import ResetPasswordForm from '../../components/auth/ResetPasswordForm'

const ResetPassword = () => {
    return (
        <>
            <div className='flex flex-col items-center gap-2 w-full' >

                <div className='lg:w-[35%] flex flex-col gap-4'>
                    <div className='flex flex-col gap-4 '>
                        <span className='text-xl font-semibold text-gray-800'>Forgot Your Password?</span>
                        <span className='text-gray-600'>Please enter the email address associated with your account and We email you a link to reset your password</span>
                    </div>

                    {/* reset password form */}
                    <ResetPasswordForm/>


                    {/* redirect to login */}
                    <Link to="/auth/login" className='flex gap-2 items-center text-gray-600 text-md font-semibold' >
                        <ArrowLeft/>
                        Return to Login page
                    </Link>
                </div>
            </div>
        </>
    )
}

export default ResetPassword