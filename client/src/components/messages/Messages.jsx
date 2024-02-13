import React from 'react';
import { Chat_History } from './utils';
import Timeline from './utils/Timeline';
import TextMessage from './utils/TextMessage';
import MediaMessage from './utils/MediaMessage';
import ReplyMessage from './utils/ReplyMessage';

function Messages({ el ,scrollRef}) {
  return (
    <div
    ref={scrollRef}
    >
      {
        (()=>{
          switch (el.type) {
      case 'divider':
      return <Timeline el={el} />;
      case 'img':
      return <MediaMessage el={el} />;
      case 'doc':
      // Handle document
      return null;
      case 'link':
      // Handle link
      return null;
      case 'reply':
      return <ReplyMessage el={el} />;
      default:
      return <TextMessage el={el} />;
}
        })()

      }
    </div>
  );
}

export default Messages;
