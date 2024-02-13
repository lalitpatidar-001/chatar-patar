import React from 'react'

const CommonGroups = () => {
  return (
    <div className='flex flex-col gap-2'>
        <span className='text-gray-400'>1 group in common</span>
        <div className='flex gap-2'>
            <img 
            className='h-12 w-12 rounded-full'
            src="https://miro.medium.com/v2/resize:fit:1400/1*YMJDp-kqus7i-ktWtksNjg.jpeg" alt="common-group-image" />
            <div className='flex flex-col'>
                <span className='font-semibold'>Apni family</span>
                <span className='text-gray-500'>owt, parrot,Rabbit,you</span>
            </div>
        </div>
    </div>
  )
}

export default CommonGroups