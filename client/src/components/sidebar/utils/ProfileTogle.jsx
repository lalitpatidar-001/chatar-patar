import React, { useState } from 'react'
import ProfileMenu from './ProfileMenu'

function ProfileTogle() {
  const [profileMenuOpen , setProfileMenuOpen] = useState(false);

  return (<div className='relative'>

    <div 
    onClick={()=>setProfileMenuOpen(!profileMenuOpen)}
    className='h-10 w-10 rounded-full overflow-hidden cursor-pointer'>
        <img className='h-full w-full rounded-full' src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg" alt="profile-image" />
    </div>
       {profileMenuOpen && <ProfileMenu
        setProfileMenuOpen={setProfileMenuOpen}
       />}
  </div>
  )
}

export default ProfileTogle