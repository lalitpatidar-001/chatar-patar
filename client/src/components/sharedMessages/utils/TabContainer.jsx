import { Tab, Tabs } from '@mui/material';
import React, { useState } from 'react'

const TabContainer = ({currentTab, setCurrentTab}) => {
  

  const handleChange = (event: React.SyntheticEvent, currentTab: number) => {
    setCurrentTab(currentTab);
  };

  return (
    <Tabs value={currentTab} onChange={handleChange} centered>
      <Tab label="Media" />
      <Tab label="Links" />
      <Tab label="Docs" />
    </Tabs>
  )
}

export default TabContainer