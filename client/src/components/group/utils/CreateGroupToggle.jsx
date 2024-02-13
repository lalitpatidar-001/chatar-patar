import { Plus } from 'phosphor-react'
import React from 'react'

const CreateGroupToggle = ({setCreateGroupDialogOpen}) => {

    const handleClickCreateGroupDialog = ()=>{
        setCreateGroupDialogOpen(true)
    }
  return (
    <div
    onClick={handleClickCreateGroupDialog}
     className='flex justify-between items-center cursor-pointer text-blue-500 p-2 py-3'>
    <span className=''>Create New Group</span>
    <Plus className='text-2xl'/>
    </div>
  )
}

export default CreateGroupToggle