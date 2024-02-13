import React from 'react'
import PropTypes from 'prop-types'

// froms
import { useFormContext, Controller } from "react-hook-form";
// mui
import { TextField } from '@mui/material';


const RHFTextField = ({ name, label,helperText, ...others }) => {
    RHFTextField.propTypes={
        name:PropTypes.string,
        label:PropTypes.string,
        helperText:PropTypes.node,
    }
    const { control } = useFormContext();
    return (
        <Controller
         name={name} 

         control={control} 
         render={((
            { field, fieldState: { error }})=> (
            <TextField
            label={label}
             {...field}
              fullWidth 
              error={!!error} helperText={error ? error.message : helperText}
            {...others}
            />
        ))}/>
  )
}

export default RHFTextField