import React from 'react'
import { profile_menu_options } from './profile_menu_options'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Logout } from '../../../redux/slices/auth'

const ProfileMenu = ({setProfileMenuOpen}) => {
  const dispatch = useDispatch();
  const handleClickMeniOptions = (index)=>{
    setProfileMenuOpen(false)
    if(index===2){
      dispatch(Logout())
    }
  }
  return (
    <div className='w-fit flex flex-col dark:bg-[#171a21]
    bg-white
      rounded   absolute z-40 p-2
    -right-[110px] bottom-4
    shadow-lg
    '>
      {
        profile_menu_options.map((item,index) => (
          <Link to={item.path}>

            <div 
            onClick={()=>handleClickMeniOptions(index)}

            className='
               flex justify-start items-center 
               gap-2
               hover:bg-[#dddddd] 
               hover:dark:bg-[#202630]
               p-1
               cursor-pointer
               
               dark:text-white
           
               '>
              <span className=' '>{item.icon}</span>
              <span>{item.title}</span>
            </div>
          </Link>
        ))
      }
    </div>
  )
}

export default ProfileMenu