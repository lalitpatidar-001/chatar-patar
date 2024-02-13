import { useState } from 'react';
import Theme from './utils/Theme';
import ProfileTogle from './utils/ProfileTogle';
import Logo from './utils/Logo';
import Menu from './utils/Menu';
import Divider from './utils/Divider';
import SettingToggle from './utils/SettingToggle';
import { Link } from 'react-router-dom';

function SideBar() {


    return (
        <>
            {/* wrapper */}
            <div className="w-[100px] h-screen dark:bg-[#202630] bg-[#F0F4FA] flex flex-col items-center py-2 justify-between">

                {/* upper div */}
                <div className='flex flex-col gap-4 items-center'>
                    {/* logo */}
                    <Logo />
                    {/* menus */}
                    <Menu />
                    {/* divider */}
                    <Divider />
                    {/* setting */}
                    <Link to="/settings">
                        <SettingToggle />
                    </Link>
                </div>

                {/* lower div */}
                <div className='flex flex-col gap-1 items-center '>
                    {/* theme toggle */}
                    <Theme />
                    {/* profile  */}
                    <ProfileTogle />
                </div>
            </div>

        </>
    )
}

export default SideBar;