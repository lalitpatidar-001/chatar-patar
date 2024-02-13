import React, { useState } from 'react';
import FormProvider from '../hook-form/FormProvider';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, IconButton, InputAdornment } from '@mui/material';
import { Link  } from 'react-router-dom';
import { RHFTextField } from '../hook-form';
import { Eye, EyeSlash } from 'phosphor-react';
import { LoginUser } from '../../redux/slices/auth';
import  {useDispatch} from "react-redux"

const LoginForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: 'example@gmail.com',
    password: 'example123',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { reset, setError, handleSubmit, formState } = methods;

  const onSubmit = async (data) => {
    try {
      // api call
      dispatch(LoginUser(data))
    } catch (error) {
      console.log(error);
      reset();
      setError('afterSubmit', {
        message: error.message,
      });
    }
  };


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-4'>
        {formState.errors.afterSubmit && <Alert severity='error'>{formState.errors.afterSubmit.message}</Alert>}

        <RHFTextField name='email' label='Email address' />

        <RHFTextField
          name='password'
          label='Password'
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                className='cursor-pointer'
                 onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className='flex justify-end my-1'>
      <Link to="/auth/reset-password">
            <span className='text-gray-700 font-semibold underline cursor-pointer '>forgotpassword?</span>
      </Link>
      </div>
      <button className='w-full mt-1 text-lg  text-white bg-gray-900 p-1 rounded font-semibold
      hover:bg-gray-500' type='submit'> Login</button>
    </FormProvider>
  );
};

export default LoginForm;
