import React, { useState } from 'react';
import FormProvider from '../hook-form/FormProvider';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, IconButton, InputAdornment } from '@mui/material';
import { Link,useSearchParams } from 'react-router-dom';
import { RHFTextField } from '../hook-form';
import { Eye, EyeSlash } from 'phosphor-react';
import { useDispatch } from 'react-redux';
import { NewPassword } from '../../redux/slices/auth';

const NewPasswordForm = () => {
  const dispatch = useDispatch();
  const [queryParameters] = useSearchParams();
    const [showPassword, setShowPassword] = useState(false);

  const NewPasswordSchema = Yup.object().shape({
    newPassword: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('newPassword'),null],"Password must match"),
  });

  const defaultValues = {
    newPassword: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewPasswordSchema),
    defaultValues,
  });

  const { reset, setError, handleSubmit, formState } = methods;

  const onSubmit = async (data) => {
    console.log("data " ,data)
    try {
      // api call
        dispatch(NewPassword(
          {...data,token:queryParameters.get("token")}
          )
          );
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
      <div className='flex flex-col gap-4'>
        {formState.errors.afterSubmit && <Alert severity='error'>{formState.errors.afterSubmit.message}</Alert>}

        <RHFTextField
                    name='newPassword'
                    label='New Password'
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton
                                    className='cursor-pointer'
                                    onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <Eye /> : <EyeSlash />}
                                </IconButton>
                            </InputAdornment>)}}
                            />
        <RHFTextField
                    name='confirmPassword'
                    label='Confirm Password'
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton
                                    className='cursor-pointer'
                                    onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <Eye /> : <EyeSlash />}
                                </IconButton>
                            </InputAdornment>)}}
                            />
        
      <button 
      className='w-full mt-3 text-lg  text-white bg-gray-900 p-1 rounded font-semibold
      hover:bg-gray-500' type='submit'> Save Password</button>
      </div>
    </FormProvider>
  );
};

export default NewPasswordForm;
