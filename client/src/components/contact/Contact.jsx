import React from 'react'
import Header from './utils/Header'
import UserInfo from './utils/UserInfo'
import About from './utils/About'
import { Divider } from '@mui/material'
import Shared from './utils/Shared'
import StarredMessage from './utils/StarredMessage'
import MuteNotification from './utils/MuteNotification'
import CommonGroups from './utils/CommonGroups'
import { Flag, Prohibit, Trash } from 'phosphor-react'
import BlockDialog from './utils/BlockDialog'
import DeleteChatDialog from './utils/DeleteChatDialog'

const Contact = () => {
  const [blockDialogOpen, setBlockDialogOpen] = React.useState(false);
  const [deleteChatOpen,setDeleteChatOpen] = React.useState(false);

const handleBlockDialogOpen = () => {
  setBlockDialogOpen(true);
};
const handleDeletChatOpen = () => {
  console.log("clicked deleete")
  setDeleteChatOpen(true);
};
  return (
    <div
    className='w-[320px]
    h-screen
    flex flex-col
    dark:bg-[#202630] dark:text-white
    '
    >
    {/* header */}
    <Header/>

    {/* body */}
    <div className='w-full flex flex-col  flex-grow overflow-y-scroll p-6  gap-3 '>
        {/* user info */}
        <UserInfo/>
        <Divider />

        {/* about */}
        <About/>
        <Divider />

        {/* shared */}
        <Shared/>
        <Divider />

        {/* starred msg */}
        <StarredMessage/>
        <Divider />

        {/* mute notification */}
        <MuteNotification/>
        <Divider/>

        {/* common groups  */}
        <CommonGroups/>
        <Divider/>

{/* actions */}
        <div className='flex justify-evenly items-center gap-2'>
            
           <button 
           onClick={handleBlockDialogOpen}
           className='flex gap-1 px-4 p-1 border-[1.5px] border-blue-500 text-blue-500 rounded-md  items-center justify-center'><Prohibit/>Block</button>

           <button 
           onClick={handleDeletChatOpen}
           className='flex gap-1 px-3 p-1 border-[1.5px] border-blue-500 text-blue-500 rounded-md items-center justify-center'><Trash/> Delete</button>
          
        </div>
    </div>
    {blockDialogOpen && <BlockDialog blockDialogOpen={blockDialogOpen} setBlockDialogOpen={setBlockDialogOpen}/>}

    {deleteChatOpen && <DeleteChatDialog
      deleteChatOpen={deleteChatOpen}
      setDeleteChatOpen={setDeleteChatOpen}
    />}

    </div>
  )
}

export default Contact