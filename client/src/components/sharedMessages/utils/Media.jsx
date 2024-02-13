import { Grid } from '@mui/material'
import React from 'react'

const Media = () => {
  return (
    <div className='p-1'>
        <Grid container spacing={2} className=''>
           { [1,2,3,4,5,6,7].map((item,index)=>(
            <Grid item xs={4} key={index}>
                <img className='h-20' src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg" alt="imges"/>
            </Grid>
           ))
           }
        </Grid>
    </div>
  )
}

export default Media