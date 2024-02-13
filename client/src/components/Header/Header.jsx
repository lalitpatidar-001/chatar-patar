import React from 'react'
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { Divider } from '@mui/material';
import { useDispatch } from 'react-redux';
import { ToggleSidebar } from '../../redux/slices/app';

function Header({firstName,lastName,status,_id}) {
    const dispatch = useDispatch();
    const handleSideBarToggle = ()=>{
        dispatch(ToggleSidebar());
        console.log("clicked")
    }
    return (
        <div className='w-full bg-[#F8FAFE] shadow-md dark:bg-[#202630] dark:text-white p-2 flex justify-between items-center' >

            {/* left */}
            <div className='w-full h-full flex gap-2 items-center'>
                  {/* image */}
                  <div
                  
                  className='relative
                  cursor-pointer
                  '>
                    <img 
                    onClick={handleSideBarToggle} 
                    className='h-12 w-12 rounded-full' src="https://plus.unsplash.com/premium_photo-1674435577971-8c8d50089450?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGhvdG98ZW58MHx8MHx8fDA%3D" />
                </div>
                {/* name and msg */}
                <div className='flex flex-col '>
                    <h3 className='text-sm font-[700]'>{firstName}{" "}{lastName}</h3>
                    {status === "Online" &&<span className='text-[#7C7C7D] text-sm'>Online</span>}
                </div>
            </div>

            {/* right */}
            <div className='flex items-center gap-2'>
                <CallIcon />
                <VideocamIcon />
                <SearchOutlinedIcon />
                <Divider orientation='vertical' flexItem  />
                <ExpandMoreOutlinedIcon />
            </div>
        </div>
    )
}

export default Header 