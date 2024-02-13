import React, { useState } from 'react';
import FormProvider from '../hook-form/FormProvider';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, IconButton, InputAdornment } from '@mui/material';
import { Link  } from 'react-router-dom';
import { RHFTextField } from '../hook-form';
import { Eye, EyeSlash } from 'phosphor-react';
import { useDispatch } from 'react-redux';
import { ForgotPassword } from '../../redux/slices/auth';

const ResetPasswordForm = () => {
  const dispatch = useDispatch();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });

  const defaultValues = {
    email: 'example@gmail.com',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { reset, setError, handleSubmit, formState } = methods;

  const onSubmit = async (data) => {
    try {
      // api call
      dispatch(ForgotPassword(data));
    } catch (error) {
      console.log(error);
      reset();
      setError('afterSubmit', {
        message: error.message,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}
    className="">
      <div className=''>
        {formState.errors.afterSubmit && <Alert severity='error'>{formState.errors.afterSubmit.message}</Alert>}

        <RHFTextField name='email' label='Email address' />

        
      </div>
      <button className='w-full mt-3 text-lg  text-white bg-gray-900 p-1 rounded font-semibold
      hover:bg-gray-500' type='submit'> Send Request</button>
    </FormProvider>
  );
};

export default ResetPasswordForm;
