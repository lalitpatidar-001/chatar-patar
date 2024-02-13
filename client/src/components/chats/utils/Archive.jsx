import React from 'react'
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
function Archive() {
  return (
    <div className='flex gap-1 p-4 py-2 items-center'>
    <ArchiveOutlinedIcon style={{fontSize:22}}/>
    <span className='text-sm font-bold text-[#709ce6]'>Archive</span>
    </div>
  )
}

export default Archive