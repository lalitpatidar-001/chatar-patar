import React, { useState } from 'react'
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import FormProvider from '../hook-form/FormProvider';
import { RHFTextField } from '../hook-form';
import { Alert, IconButton, InputAdornment } from '@mui/material';
import { Eye, EyeSlash } from 'phosphor-react';
import { useDispatch } from 'react-redux';
import { RegisterUser } from '../../redux/slices/auth';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);

    const RegisterSchema = Yup.object().shape({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        email: Yup.string().required('Email is required').email('Email must be a valid email address'),
        password: Yup.string().required('Password is required'),
    });

    const defaultValues = {
        firstName: "",
        lastName: "",
        email: '',
        password: '',
    };

    const methods = useForm({
        resolver: yupResolver(RegisterSchema),
        defaultValues,
    });

    const { reset, setError, handleSubmit, formState } = methods;

    const onSubmit = async (data) => {
        try {
            // api call
            dispatch(RegisterUser(data));
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

                <div className='flex  gap-2 '>
                    <RHFTextField name='firstName' label='First Name' />

                    <RHFTextField name='lastName' label='Last Name' />
                </div>

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
            <button className='w-full mt-3 text-lg  text-white bg-gray-900 p-1 rounded font-semibold
      hover:bg-gray-500' type='submit'> Create Account</button>
        </FormProvider>
    )
}

export default RegisterForm