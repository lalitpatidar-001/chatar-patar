import { Divider } from '@mui/material'
import { ArrowDownRight, ArrowLineUpRight, ArrowRight, Star, StarFour } from 'phosphor-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { UpdateSidebarType } from '../../../redux/slices/app'

const StarredMessage = () => {
    const dispatch = useDispatch();
    const hadleStarredToggle = ()=>{
        dispatch(UpdateSidebarType('STARRED'));
    }
    return (
        <div className='flex flex-col gap-2  cursor-pointer'>
           
                <div className='flex items-center justify-between pb-1'>
                    <div className='flex items-center gap-2'>
                        <Star className='text-gray-900' />
                        <span className='text-gray-600'>Starred Messages</span>
                    </div>
                    <div 
                     onClick={hadleStarredToggle}
                    >
                    <ArrowRight  
                    className='text-gray-600'/>
                    </div>
                </div>
        </div>
    )
}

export default StarredMessage