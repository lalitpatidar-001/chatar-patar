import { Plus } from 'phosphor-react'
import React from 'react'

const MakeNewCallToggle = ({setMakeNewCallDialogOpen}) => {

    const handleClickCreateGroupDialog = ()=>{
      setMakeNewCallDialogOpen(true)
    }
  return (
    <div
    onClick={handleClickCreateGroupDialog}
     className='flex justify-between items-center cursor-pointer text-blue-500 p-2 py-3'>
    <span className=''>Make New Call</span>
    <Plus className='text-2xl'/>
    </div>
  )
}

export default MakeNewCallToggle