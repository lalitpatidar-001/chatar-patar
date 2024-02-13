import React, { useCallback, useState } from 'react';
import * as Yup from 'yup';
import {  useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, IconButton, InputAdornment } from '@mui/material';
import { Link  } from 'react-router-dom';
import { Eye, EyeSlash } from 'phosphor-react';
import FormProvider from '../../hook-form/FormProvider';
import { RHFTextField } from '../../hook-form';

const ProfileForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const ProfileSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    about: Yup.string().required('About is required'),
    avatarUrl:Yup.string().required("Image is Required").nullable(true)
  });

  const defaultValues = {
    name: '',
    about: '',

  };

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const { reset, setError,
    watch, control,setValue, handleSubmit, formState } = methods;

  const onSubmit = async (data) => {
    try {
      // api call
      console.log(data)
    } catch (error) {
      console.log(error);
      reset();
      setError('afterSubmit', {
        message: error.message,
      });
    }
  };

  const values = watch();
  const handleDrop = useCallback((acceptedField)=>{
    const file = acceptedField[0];
    const newFile = Object.assign(file,{
        preview:URL.createObjectURL(file)
    })
    if(file){
        setValue("avatarUrl",newFile,{shouldValidate:true})
    }

  },[setValue])

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-4'>
        {formState.errors.afterSubmit && <Alert severity='error'>{formState.errors.afterSubmit.message}</Alert>}

        <RHFTextField name='name' label='Name'  helperText={"This name is visible to your contacts"} />

        <RHFTextField 
        multiline
        rows={4} maxRows={5}
        name='about' label='About'
         />

      <button className=' mr-1 text-lg 
      self-end w-fit  text-white bg-gray-900 p-1 px-3 rounded font-semibold
      hover:bg-gray-500' type='submit'> Save</button>
    </div>

    </FormProvider>
  );
};

export default ProfileForm;
