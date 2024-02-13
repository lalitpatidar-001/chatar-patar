import React from 'react'
import PropTypes from 'prop-types'

// froms
import { useFormContext, Controller } from "react-hook-form";
// mui
import { Autocomplete, TextField } from '@mui/material';


const RHFAutoComplete
 = ({ name,label, helperText, ...others }) => {
    RHFAutoComplete
    .propTypes={
        name:PropTypes.string,
        label:PropTypes.string,
        helperText:PropTypes.node,
    }
    const { control,setValue } = useFormContext();
    return (
        <Controller
         name={name} 
         control={control} 
         render={(({field, fieldState: { error }})=> (
            <Autocomplete
             {...field}
              fullWidth
              onChange={(event,newValue)=>setValue(name,newValue,{
                shouldValidate:true
              })} 
              error={!!error} helperText={error ? error.message : helperText}
            {...others}

            renderInput={(params)=>(
                <TextField
                    label={label}
                    error={!!error}
                    helperText={error ? error.message : helperText}
                    {...params}
                />
            )}
            />
        ))}/>
  )
}

export default RHFAutoComplete
