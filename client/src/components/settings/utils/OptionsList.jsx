import React from 'react'
import Option from './Option'
import { Divider } from '@mui/material'
import { Bell, Image, Info, Key, Keyboard, Lock, Note, PencilCircle } from "phosphor-react";
import ThemeDialog from './ThemeDialog';
import ShorcutsDialog from './ShorcutsDialog';

const OptionsList = () => {
    const [themeDialogOpen, setThemeDialogOpen] = React.useState(false);
    const [shortuctDialogOpen, setShortuctDialogOpen] = React.useState(false);

    const handleThemeDialogOpen = () => {
        setThemeDialogOpen(true)
    }
    const handleShortcutDialogOpen = () => {
        setShortuctDialogOpen(true)
    }

    const setting_options_list = [
        {
            key: 0,
            icon: <Bell size={20} />,
            title: "Notifications",
            onclick: () => { },
        },
        {
            key: 1,
            icon: <Lock size={20} />,
            title: "Privacy",
            onclick: () => { },
        },
        {
            key: 2,
            icon: <Key size={20} />,
            title: "Security",
            onclick: () => { },
        },
        {
            key: 3,
            icon: <PencilCircle size={20} />,
            title: "Theme",
            onclick: handleThemeDialogOpen,
            // onclick:handleOpenTheme,
        },
        {
            key: 4,
            icon: <Image size={20} />,
            title: "Chat Wallpaper",
            onclick: () => { },
        },
        {
            key: 5,
            icon: <Note size={20} />,
            title: "Request Account Info",
            onclick: () => { },
        },
        {
            key: 6,
            icon: <Keyboard size={20} />,
            title: "Keyboard Shortcuts",
            onclick:handleShortcutDialogOpen,
        },
        {
            key: 7,
            icon: <Info size={20} />,
            title: "Help",
            onclick: () => { },
        },
    ]

    return (
        <>

            <div className='flex flex-col py-4 '>
                {setting_options_list.map((item) => (<>

                    <Option {...item} />
                    {item.key !== 7 && <Divider />}
                </>
                ))}
            </div>

{/* theme dialog */}
            {themeDialogOpen && <ThemeDialog themeDialogOpen={themeDialogOpen}
                setThemeDialogOpen={setThemeDialogOpen}
            />}

{/* shorcut dialog */}
{shortuctDialogOpen && 
        <ShorcutsDialog shortuctDialogOpen={shortuctDialogOpen}
        setShortuctDialogOpen={setShortuctDialogOpen}
        />}
        </>
    )
}

export default OptionsList