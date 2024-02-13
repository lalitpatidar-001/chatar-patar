import React, { useState } from 'react'
import HistoryToggleOffOutlinedIcon from '@mui/icons-material/HistoryToggleOffOutlined';
import SearchBar from './utils/SearchBar';
import Archive from './utils/Archive';
import { Divider } from '@mui/material';
import ChatElement from './utils/ChatElement';
import CreateGroupToggle from './utils/CreateGroupToggle';
import CreateGroupDialog from './utils/CreateGroupDialog';

function GroupChats() {

  const [createGroupDialogOpen , setCreateGroupDialogOpen] = useState(false);

  return (
    <div className='relative w-[320px] bg-[#F8FAFF] dark:bg-[#202630] shadow-emerald-600 h-[100vh] overflow-hidden  dark:text-white '>
      {/* chat heading */}
      <div className='flex justify-between items-center p-4 py-4'>
        <h4 className='font-semibold'>GroupChats</h4>
        <HistoryToggleOffOutlinedIcon />
      </div>

      {/* search bar */}
      <SearchBar />

      {/* archive */}
      {/* <Archive /> */}

      {/* create group option */}
      <CreateGroupToggle setCreateGroupDialogOpen={setCreateGroupDialogOpen}/>

      {/* divider */}
      <Divider />

      {/* GroupChats */}
      <div className='flex flex-col gap-2 overflow-y-scroll h-[100%]'>
        {/* pinned chat */}
        <div className='flex flex-col gap-2'>
          <span className='text-[#676667] text-sm pl-4 font-[500]'>Pinned</span>
          <ChatElement />
          <ChatElement />
        </div>
        {/* all chat */}
        <div className=' flex flex-col gap-2'>
          <span className='text-[#676667] text-sm pl-4 font-[500]'>All GroupChats</span>
          <ChatElement />
          <ChatElement />
          <ChatElement />
          <ChatElement />
          <ChatElement />
          <ChatElement />
          <ChatElement />
          <ChatElement />
          <ChatElement />
          <ChatElement />
          <ChatElement />
          <ChatElement />
          <ChatElement />
          <ChatElement />
          <ChatElement />
        </div>
      </div>
      {createGroupDialogOpen && <CreateGroupDialog 
createGroupDialogOpen={createGroupDialogOpen}
setCreateGroupDialogOpen={setCreateGroupDialogOpen}

/>}
    </div>
  )
}

export default GroupChats