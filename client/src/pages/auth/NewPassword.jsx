import { ArrowLeft } from 'phosphor-react'
import React from 'react'
import { Link } from 'react-router-dom'
import NewPasswordForm from '../../components/auth/NewPasswordForm'


const NewPassword = () => {
    return (
        <>
            <div className='flex flex-col items-center gap-2 w-full' >

                <div className='lg:w-[35%] flex flex-col gap-4'>
                    <div className='flex flex-col gap-4 '>
                        <span className='text-xl font-semibold text-gray-800'>Reset Your Password?</span>
                        <span className='text-gray-600'>Please set your new password</span>
                    </div>

                    {/* reset password form */}
                    <NewPasswordForm/>


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

export default NewPassword