import { TextField } from '@mui/material';
import React, { useRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form';

export const RHFCodes = ({
    keyName="",
    inputs =[],
    ...others
}) => {

    const codeRef = useRef(null);
    const {control} = useFormContext();

  return (
    <div className='flex gap-2 justify-center h-full' >
        {
            inputs.map((name,index)=>{
                <Controller
                key={name}
                name={`${keyName}${index + 1}`}
                control={control}
                render={({field,fieldState:{error}})=>(
                       <TextField 
                       sx={{border:2,width:300
                       , height:300}}
                       
                        {...field}
                        error={!!error}
                        autoFocus={index===0}
                        placeholder={"_"}
                        onChange={(event)=>{
                            //
                        }}
                        />
                )}

                >

                </Controller>
            })
        }
    </div>
  )
}
