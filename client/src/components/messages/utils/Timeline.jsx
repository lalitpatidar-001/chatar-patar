import { Divider } from '@mui/material'
import React from 'react'

function Timeline({el}) {
  return (
    <div className='flex items-center justify-between'>
    <Divider width="46%"  />
    <span className='dark:text-white text-[12px]'>{el.text}</span>
    <Divider width="46%" />
    </div>
  )
}

export default Timeline