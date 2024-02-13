import React from 'react'
import * as Yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormProvider from '../../hook-form/FormProvider';
import { RHFTextField } from '../../hook-form';
import RHFAutoComplete from '../../hook-form/RHFAutoComplete';

const MEMBERS = [
    "LALIT ",
    "LALIT1 ",
    "LALIT2",
    "LALIT3",

]

const CreateNewGroupForm = () => {
    const NewGroupSchema = Yup.object().shape({
        title: Yup.string().required("New group name required"),
        members: Yup.array().min(2, "Must have at least two members ")
    });

    const defaultValues = {
        title: "",
        members: [],
    }

    const methods = useForm({
        resolver: yupResolver(NewGroupSchema),
        defaultValues,

    });

    const {
        reset,
        setError,
        handleSubmit,
        watch,
        formState: {
            errors, isSubmitting, isSubmitSuccessful, isValid
        }

    } = methods;

    const onSubmit = async (data) => {
        try {
            // call api
        } catch (error) {
            console.log(error);
            reset();
            setError("title", { message: error.message });
        }
    };

    return (
        <FormProvider
            methods={methods} onSubmit={handleSubmit(onSubmit)}>

          
                <div className='flex flex-col gap-3 h-full'>
                    <RHFTextField
                        name="title" label="Title" />

                    <RHFAutoComplete
                        name="members"
                        label="Members"
                        freeSolo
                        multiple
                        options={MEMBERS.map((option) => option)}
                    />
                </div>
                <div className='flex justify-end mt-6 '>
                    <button
                        className='bg-blue-500 text-white items-center p-2 px-4 rounded font-semibold'
                        type='submit'
                    >Create</button>
                </div>

        </FormProvider>
    )
}

export default CreateNewGroupForm