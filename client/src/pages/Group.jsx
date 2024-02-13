import React, { useState } from 'react'
import GroupChats from '../components/group/GroupChats'
import CreateGroupDialog from '../components/group/utils/CreateGroupDialog'

const Group = () => {
    

  return (
    <>
        <div className='flex w-full'>
        {/*chats  */}
            <GroupChats/>

        {/* messages */}
        </div>
    </>
  )
}

export default Group