import React, { useEffect, useState } from 'react'
import HistoryToggleOffOutlinedIcon from '@mui/icons-material/HistoryToggleOffOutlined';
import SearchBar from './utils/SearchBar';
import Archive from './utils/Archive';
import { Divider } from '@mui/material';
import ChatElement from './utils/ChatElement';
import {CloudFog, Users} from 'phosphor-react'
import FriendsListDialog from './utils/FriendsListDialog';
import { chats } from './utils';
import { socket } from '../../socket';
import { useDispatch, useSelector } from 'react-redux';
import { FretchDirectConversation } from '../../redux/slices/conversation';
function Chats() {

  const user_id = window.localStorage.getItem("user_id")
  const [openFriendsListDialog,setOpenFriendsListDialog] = useState(false);

  const {conversations} = useSelector(state=>state.conversation.direct_chat);
  console.log("conversationsss ",conversations)
  const dispatch= useDispatch();

  const handleOpenDialog = ()=>{
    setOpenFriendsListDialog(true);
  }

  useEffect(()=>{
    console.log("ran")
      socket?.emit("get_direct_conversatoins",{
        user_id
      },
      (data)=>{
        console.log("data",data)
        // data => list of conversation
        dispatch(FretchDirectConversation({conversations:data}))
      }
      )
  },[])

  return (
    <div className='relative w-[320px] bg-[#F8FAFF] dark:bg-[#202630] shadow-emerald-600 h-[100vh] overflow-hidden  dark:text-white '>
      {/* chat heading */}
      <div className='flex justify-between items-center p-4 py-4'>
        <h4 className='font-semibold'>Chats</h4>
       <div className='flex gap-2 items-center '>
       <Users 
       onClick={handleOpenDialog}
       className='text-2xl cursor-pointer'/>
        <HistoryToggleOffOutlinedIcon />
       </div>
      </div>

      {/* search bar */}
      <SearchBar />

      {/* archive */}
      <Archive />

      {/* divider */}
      <Divider />

      {/* chats */}
      <div className='flex flex-col gap-2 overflow-y-scroll h-[100%]'>
        {/* pinned chat */}
        <div className='flex flex-col gap-2'>
          <span className='text-[#676667] text-sm pl-4 font-[500]'>Pinned</span>
          <ChatElement />
          <ChatElement />
        </div>
        {/* all chat */}
        <div className=' flex flex-col gap-2'>
          <span className='text-[#676667] text-sm pl-4 font-[500]'>All Chats</span>
          {
            conversations?.filter((el)=>!el.pinned).map((user)=>{
              return  <ChatElement {...user} />
            })}
        </div>
      </div>

      {
        openFriendsListDialog
        &&
        <FriendsListDialog setOpenFriendsListDialog={setOpenFriendsListDialog}
          openFriendsListDialog={openFriendsListDialog}
        />
      }

    </div>
  )
}

export default Chats