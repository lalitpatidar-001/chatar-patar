import { MenuItem, MenuList } from '@mui/material'
import { DotsThreeVertical } from 'phosphor-react'
import React, { useState } from 'react'
import { Message_Options } from './Message_Options'

const MessageOptions = ({outgoing}) => {
    const [openOptions , setOpenOptions] = useState(false);

    const handleClose = ()=>{
        setOpenOptions(false)
    }
    
    return (
        <div className='flex relative self-start '>

            <DotsThreeVertical 
            onClick={()=>setOpenOptions(!openOptions)} className='text-black 
            
            dark:text-white text-xl ' />

           { openOptions && 
           <div className={`rounded absolute 
           ${outgoing?"right-4":"left-4"} bg-white dark:bg-[#202630] z-50 dark:text-white
           hover:bg-[#171a21]`}>
                <MenuList>
                    <div>
                        {Message_Options.map((item) => (
                            <MenuItem
                                className=''
                                onClick={ handleClose }
                            >{item.title}</MenuItem>
                        ))}
                    </div>
                </MenuList>
            </div>}
        </div>
    )
}

export default MessageOptions