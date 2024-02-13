import { ArrowLeft } from 'phosphor-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { UpdateSidebarType } from '../../../redux/slices/app';

const Header = () => {
    const dispatch = useDispatch();
    const handleStarredToggle = ()=>{
        dispatch(UpdateSidebarType("CONTACT"))
    }
    return (
        <div className='flex 
        shadow-lg  items-center p-5'>
            <div className='flex items-center gap-2 '>
                <ArrowLeft 
                onClick={handleStarredToggle}
                className='text-2xl cursor-pointer' />
                <span>Sharred Messages</span>
            </div>
        </div>
    )
}

export default Header