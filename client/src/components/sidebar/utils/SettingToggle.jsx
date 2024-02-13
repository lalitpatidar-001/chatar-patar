import React from 'react'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

function SettingToggle() {
  return (
    
    <div>
    <div className={`h-12 w-12  rounded-xl flex items-center justify-center cursor-pointer
        transition-all duration-300 ease-in-out dark:text-white `}
    >
        <SettingsOutlinedIcon/>
    </div>
</div>
  )
}

export default SettingToggle