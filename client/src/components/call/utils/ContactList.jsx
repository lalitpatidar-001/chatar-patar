import React from 'react'
import ContactListElement from './ContactListElement'
import { call_list } from '.'

const ContactList = () => {
  return (
    <div>
    {call_list.map((el)=>(

    <ContactListElement {...el}/>
    ))

    }
    </div>
  )
}

export default ContactList