import { X } from 'phosphor-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { ToggleSidebar } from '../../../redux/slices/app';

const Header = () => {
    const dispatch = useDispatch();
    const handleToggle = ()=>{
        dispatch(ToggleSidebar());
    }
  return (
    <div className='
    shadow-lg
    w-full

    p-5
    flex 
    bg-[#F8FAFE]
    dark:bg-[#202630]
    '>
    <div className='flex gap-2 w-full 
     items-center dark:text-white'>
         <X 
         onClick={handleToggle}
         className='text-xl cursor-pointer
         hover:bg-[#dddddd]
         hover:dark:bg-white
           hover:dark:text-black
         hover:rounded-full
         '/>
        <span className='text-center'>Contact Info</span>
    </div>
    </div>
  )
}

export default Header