import React from 'react'

const Profile = () => {
  return (
    <div className='flex items-center gap-2'>
        <img 
        className='h-14 w-14 rounded-full '
         src='https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg' alt='profile image'/>
        <div className='flex flex-col'>
            <span className='font-semibold'>
                Lalit Patidar
            </span>
            <span className='text-gray-500'>
                bio text
            </span>
        </div>
    </div>
  )
}

export default Profile