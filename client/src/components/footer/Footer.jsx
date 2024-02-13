import React, { useEffect, useState, useRef } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ChatInput from './utils/ChatInput';
import { socket } from '../../socket';
import { useDispatch, useSelector } from 'react-redux';
import { AddNewCurrentMessage } from '../../redux/slices/conversation';

function Footer() {
  const dispatch = useDispatch();
  const [openPicker, setOpenPicker] = useState(false);
  const user_id = window.localStorage.getItem('user_id');
  const { room_id } = useSelector((state) => state.app);
  const [message, setMessage] = useState('');
  const [to_user, setToUser] = useState(null);

  useEffect(() => {
    socket?.emit('get_participants', { conversation_id: room_id }, (data) => {
      console.log(data);
      const to = data.participants?.filter((el) => el.toString() !== user_id);
      if(to?.length>0){
        setToUser(to[0]);
      }
    });
  }, [socket, room_id]);

  const hadnleEmojiPicker = (emoji)=>{
    console.log("clicked",emoji.native)
    setMessage(prevMessage => prevMessage += emoji.native)
  }


  const handleMessageSent = () => {
    if (message.trim().length > 0) {
      console.log('Sending message:', message);
      const new_message = {
        to: to_user,
        from: user_id,
        type: 'Text',
        text: message,
        conversation_id: room_id,
      };
      socket?.emit('text_message', new_message);
      dispatch(AddNewCurrentMessage({ new_message }));
      setMessage(''); // Clear message input after sending
    }
  };

const handleKeyDownOnInput = (e)=>{
  if(e.key === "Enter"){
    console.log("clicek key")
    handleMessageSent();
  }
}


  return (
    <div className='w-[100%] p-2 flex items-center gap-4 dark:bg-[#202630] rounded-xl'>
      {/* chat input  */}
      <div className='w-full'>
        <div className='z-40 fixed bottom-[55px] right-[90px]'>
          {openPicker && <Picker data={data} onEmojiSelect={hadnleEmojiPicker} />}
        </div>
        <ChatInput
          message={message}
          setMessage={setMessage}
          setOpenPicker={setOpenPicker}
          openPicker={openPicker}
          handleKeyDownOnInput={handleKeyDownOnInput}
        />
      </div>
      {/* // send button */}
      <div
        className='flex items-center p-2 bg-[#5B96F7] w-12 rounded-md justify-center shadow-lg'
        onClick={handleMessageSent}
      >
        <SendOutlinedIcon style={{ color: 'white' }} />
      </div>
    </div>
  );
}

export default Footer;
