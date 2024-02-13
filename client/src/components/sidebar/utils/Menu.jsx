import React, { useState } from 'react'
import { menus } from './menus_options'
import { Link } from 'react-router-dom';

function Menu() {
    const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
    return (
        <div className='flex flex-col '>
                        {menus.map((menu) => (
                            <Link to={menu.path}>

                            <div className={`h-10 w-10  rounded-xl flex items-center justify-center cursor-pointer
                            transition-all duration-300 ease-in-out dark:text-white
                            ${selectedMenuIndex === menu.index ? " text-white dark:bg-[#171a21] bg-[#5B96F7]" : ""}`}
                                onClick={() => setSelectedMenuIndex(menu.index)}

                            >
                                {menu.icon}
                            </div>
                            </Link>
                        ))
                        }
        </div>
   
  )
}

export default Menu