import { Divider } from '@mui/material'
import { ArrowRight } from 'phosphor-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { UpdateSidebarType } from '../../../redux/slices/app'

const Shared = () => {
    const dispatch = useDispatch();
    const handleSharedToggle = ()=>{
        dispatch(UpdateSidebarType("SHARED"))
    }
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex justify-between'>
                <span className='text-gray-500'>Media,links and docs</span>
                <button 
                onClick={handleSharedToggle}
                className='flex items-center gap-[1px] text-blue-500 cursor-pointer'>
                    201
                    <ArrowRight className='
                
                '/>
                </button>
            </div>
            {/* shared photos */}
            <div className='flex gap-2 '>
                <img 
                className='w-20 h-20'
                src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'/>
                <img 
                className='w-20 h-20'
                src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'/>
                <img 
                className='w-20 h-20'
                src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'/>

            </div>
        </div>
    )
}

export default Shared