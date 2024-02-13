import React from 'react'

const Option = ({
    key,
    icon,
    title,
    onclick
}) => {
    return (
        <div 
        onClick={onclick}
        className='flex items-center py-3 text-[#727375] cursor-pointer  gap-3'>
            <span>
                {icon}
            </span>
            <span>
                {title}
            </span>
        </div>
    )
}

export default Option