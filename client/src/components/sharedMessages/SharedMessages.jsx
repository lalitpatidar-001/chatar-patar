import React, { useState } from 'react'
import Header from './utils/Header'
import TabContainer from './utils/TabContainer'
import Media from './utils/Media';
import Links from './utils/Links';
import Docs from './utils/Docs';

const SharedMessages = () => {
  const [currentTab, setCurrentTab] = useState(0);
  console.log(currentTab)

  return (
    <div className='dark:bg-[#202630] w-[320px] h-screen  bg-white '>
      {/* header */}
      <Header />

      {/* tabs */}
      <TabContainer currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* body */}

      {
         (()=>{
            switch(currentTab){
              case 0:
              return <Media/>
              case 1:
              return <Links/>
              case 2:
              return <Docs/>
            }
        })()
      }


    </div>
  )
}

export default SharedMessages