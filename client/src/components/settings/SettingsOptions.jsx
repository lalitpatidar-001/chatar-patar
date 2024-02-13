import React from 'react'
import Header from './utils/Header'
import Profile from './utils/Profile'
import OptionsList from './utils/OptionsList'
import ThemeDialog from './utils/ThemeDialog'

const SettingsOptions = () => {
   
   
    return (
        <div className='overflow-y-scroll h-screen w-[320px] bg-[#F8FAFF] dark:text-white dark:bg-[#202630]
    shadow:md
    flex flex-col  
    '>
            {/* header */}
            <Header />

            <div className='p-3'>
                {/* profile */}
                <Profile />
                {/* list of options */}
                <OptionsList  />
            </div>

        </div>
    )
}

export default SettingsOptions