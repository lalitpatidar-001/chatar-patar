import React, { useState } from 'react'
import HistoryToggleOffOutlinedIcon from '@mui/icons-material/HistoryToggleOffOutlined';
import SearchBar from './utils/SearchBar';
import Archive from './utils/Archive';
import { Divider } from '@mui/material';
import CreateGroupToggle from './utils/MakeNewCallToggle';
import CreateGroupDialog from './utils/MakeNewCallDialog';
import CallHistoryElement from './utils/CallHistoryElement';
import MakeNewCallToggle from './utils/MakeNewCallToggle';
import { call_list } from './utils';

function Calls() {

  const [makeNewCallDialogOpen, setMakeNewCallDialogOpen] = useState(false);

  return (
    <div className='relative w-[320px] bg-[#F8FAFF] dark:bg-[#202630] shadow-emerald-600 h-[100vh] overflow-hidden  dark:text-white '>
      {/* chat heading */}
      <div className='flex justify-between items-center p-4 py-4'>
        <h4 className='font-semibold'>CallLog</h4>
        <HistoryToggleOffOutlinedIcon />
      </div>

      {/* search bar */}
      <SearchBar />

      {/* new call option */}
      <MakeNewCallToggle
        setMakeNewCallDialogOpen={setMakeNewCallDialogOpen}
      />

      {/* divider */}
      <Divider />

      {/* Calls history */}
      <div className='flex flex-col gap-2 overflow-y-scroll h-screen'>
        
        {/* pinned call
        <div className='flex flex-col gap-2'>
          <span className='text-[#676667] text-sm pl-4 font-[500]'>Pinned</span>
          <CallHistoryElement />
          <CallHistoryElement />
        </div> */}

        {/* all history calls */}
        <div className=' flex flex-col gap-2'>
          <span className='text-[#676667] text-sm pl-4 font-[500]'>All Calls</span>

         {call_list.map((el)=>(

         <CallHistoryElement {...el} />
         )) 
         }
            
          
        </div>
      </div>
      {makeNewCallDialogOpen && <CreateGroupDialog 
makeNewCallDialogOpen={makeNewCallDialogOpen}
setMakeNewCallDialogOpen={setMakeNewCallDialogOpen}

/>}
    </div>
  )
}

export default Calls