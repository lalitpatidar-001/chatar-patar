import React from 'react'
import LinkMessage from '../../messages/utils/LinkMessage'

const dumyMessages = [
    {
        type:"msg",
        subtype:"links",
        preview:"",
        messages:"ye[, i can also do that",
        incoming:true,
        outgoing:false
    },
    {
        type:"msg",
        subtype:"links",
        preview:"",
        messages:"ye[, i can also do that fff fff fff",
        incoming:true,
        outgoing:false
    },
    {
        type:"msg",
        subtype:"links",
        preview:"",
        messages:"ye[, i can also do that",
        incoming:true,
        outgoing:false
    },
    {
        type:"msg",
        subtype:"links",
        preview:"",
        messages:"ye[, i can also do that",
        incoming:true,
        outgoing:false
    },
    {
        type:"msg",
        subtype:"links",
        preview:"",
        messages:"ye[, i can also do that",
        incoming:true,
        outgoing:false
    },
]
const Links = () => {
  return (
    <div className='p-1'>
     {
        dumyMessages.map((el)=>(
            <LinkMessage el={el}/>
        ))
     }
    </div>
  )
}

export default Links