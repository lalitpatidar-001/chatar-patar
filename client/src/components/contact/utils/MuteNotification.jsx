import { Bell, Notification } from 'phosphor-react'
import React from 'react'

const MuteNotification = () => {
    return (
        <div className='flex items-center justify-between'>
            <div className='flex gap-2 items-center'>
                <Bell />
                <span>Mute Notification</span>
            </div>
            <div>Mute</div>
        </div>
    )
}

export default MuteNotification