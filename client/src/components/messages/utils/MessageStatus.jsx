import React from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { CaretCircleDoubleUp, CaretCircleUp } from 'phosphor-react';

const MessageStatus = ({status}) => {
  return (
    <>
    {
       (()=>{
        switch(status){
            case "Sent":
                return <CaretCircleUp/>
            case "Read":
                return <CaretCircleDoubleUp className='text-red-500'/>
            case "Delivered":
                return  <CaretCircleDoubleUp/>
            case "Pending":
                return <AccessTimeIcon/>
        }
       })()
    }
    </>
  )
}

export default MessageStatus