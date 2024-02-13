import React from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';

function SearchBar() {
  return (
    // containet
    <div className='relative rounded-3xl bg-[#EAF2FE] dark:bg-[#171a21]  p-2 px-4 w-full flex
    text-[#709CE6] items-center'>
    <SearchOutlinedIcon style={{fontSize:22}}/>
     <input className='    w-full   outline-none   bg-transparent placeholder:text-[#709ce6] px-1' type="text" placeholder='Search'  >
        
     </input>
     <FilterListOutlinedIcon/>
    </div>
  )
}

export default SearchBar