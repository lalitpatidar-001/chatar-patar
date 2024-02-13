import React, { useEffect, useState } from 'react'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { json } from 'react-router-dom';

function Theme() {
  const initailtheme = localStorage.getItem("theme")
  const [theme, setTheme] = useState(initailtheme);

  useEffect(()=>{
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  },[])


  const hadleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    if (theme === "light") {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme","dark")
    } else {
      localStorage.setItem("theme","light")
      document.documentElement.classList.remove("dark")
    }
  }
  return (
    <div
      className={`cursor-pointer  h-10 w-10 rounded-xl flex items-center justify-center
    ${theme === "dark" ? "bg-[#5B96F7] text-white dark:bg-[#171a21] " : ""}`}
      onClick={hadleThemeToggle}>
      <DarkModeOutlinedIcon />
    </div>
  )
}

export default Theme