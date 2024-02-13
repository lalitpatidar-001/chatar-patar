import React from 'react'
import Contact from '../components/contact/Contact'
import StarredMessages from '../components/starredMessages/StarredMessages'
import SharedMessages from '../components/sharedMessages/SharedMessages'
import Conversation from '../components/conversatoin/Conversation'
import Chats from '../components/chats/Chats'
import { useSelector } from 'react-redux'

function Home() {
  const {sidebar,room_id , chat_type} = useSelector((store)=>store.app);
  return (
    <div className='flex'>
    <Chats/>

 {( room_id !== null && chat_type==="individual")
 ?
 <Conversation/>:<h1>no room selected</h1>}

{/* contact */}

{sidebar.open && (
()=>{
        switch(sidebar.type){
                case "CONTACT":
                    return <Contact/>
                case 'STARRED':
                    return <StarredMessages/>
                case 'SHARED':
                    return <SharedMessages/>
        }

}
)()

}
    </div>
  )
}

export default Home