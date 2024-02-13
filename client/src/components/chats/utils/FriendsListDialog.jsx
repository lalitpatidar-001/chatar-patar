import { Dialog, DialogContent, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import UserList from './UserList';
import RequestsList from './RequestsList';
import FriednsList from './FriednsList';

const FriendsListDialog = ({openFriendsListDialog,setOpenFriendsListDialog}) => {

  const [tabs , setTabs] = useState(0);

  const handleCloseFriendsListDialog = ()=>{
    setOpenFriendsListDialog(false);
  }

  const handleChangeTabs = (event,index)=>{
      setTabs(index);
  }
    
  return (
    <Dialog 
    fullWidth 
    maxWidth="xs" 
    open={openFriendsListDialog}
    keepMounted
    onClose={handleCloseFriendsListDialog}
    sx={{p:4}}
    >
    <div className='p-2 w-full '>
      <Tabs value={tabs} onChange={handleChangeTabs} centered>
       <Tab label="Explore"/>
       <Tab label="Friends"/>
       <Tab label="request"/>

      </Tabs>
    </div>
    {/* content */}
    <DialogContent>
       <div className='flex flex-col h-full '>
          <div className='flex gap-2 '>
              {
                (()=>{
                  switch(tabs){
                  case 0 :
                   return <UserList/>
                  case 1 :
                   return <FriednsList/>
                  case 2 :
                   return <RequestsList/>
                }
                })()
              }
          </div>
       </div>
    </DialogContent>

    </Dialog>
  )
}

export default FriendsListDialog