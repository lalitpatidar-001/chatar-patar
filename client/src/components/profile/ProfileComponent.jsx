import React from 'react'
import Header from './utils/Header'
import ProfileForm from './utils/ProfileForm'

const ProfileComponent = () => {
  return (
    <div className='w-[320px]'>

      {/* Header */}
      <Header/>
{/* profile form */}
      <div className='p-3'>
        <ProfileForm/>
      </div>

    </div>
  )
}

export default ProfileComponent