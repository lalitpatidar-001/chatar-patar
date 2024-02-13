import React from 'react'
import SettingsOptions from '../components/settings/SettingsOptions'
import SettingsRight from '../components/settings/SettingsRight'

const Settings = () => {
  return (
    <div className='flex  w-full'>
    {/* left panel */}
        <SettingsOptions/>
    {/* right panel */}
        <SettingsRight/>
    </div>
  )
}

export default Settings