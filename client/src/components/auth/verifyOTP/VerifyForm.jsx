import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as Yup  from "yup"
import FormProvider from '../../hook-form/FormProvider';
import { RHFCodes } from '../../hook-form/RHFCodes';
import { VerifyEmail } from '../../../redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
const VerifyForm = () => {
    const {email} = useSelector((state)=>state.auth)
    const dispatch = useDispatch();
    const [OTPcode , setOTPCode] = useState("");
    const [error,setError] = useState(null);
    // get email from stote

const VerifySchema = Yup.object().shape({
    code1:Yup.string().required("Code is required"),
    code2:Yup.string().required("Code is required"),
    code3:Yup.string().required("Code is required"),
    code4:Yup.string().required("Code is required"),
    code5:Yup.string().required("Code is required"),
    code6:Yup.string().required("Code is required"),
});

const defaultValues = {
    code1:"",
    code2:"",
    code3:"",
    code4:"",
    code5:"",
    code6:"",
}

const methods = useForm({
    mode:"onChange",
    resolver:yupResolver(VerifySchema),
    defaultValues
})

const {handleSubmit , formState} = methods
 
const onSubmit = async ()=>{
    try {
        // call api
       
    } catch (error) {
        console.log(error)
    }
}

const handleOTPSubmit = (e)=>{
        e.preventDefault();
        if(OTPcode.length!==6){
            setError("otp must be 6 number long")
        }
        else{
            dispatch(VerifyEmail({OTPcode,email}))
        }
}

  return (
    // <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-4'>

          
            {/* <RHFCodes 

                keyName='code'
                inputs={["code1","code2","code3","code4","code6","code6"]}
            /> */}
<form onSubmit={handleOTPSubmit}>

            <div className='flex flex-col '>
            <input 
            className='border border-gray-500
            rounded p-1 w-1/2 outline-none'
            required
            onChange={(e)=>(setOTPCode(e.target.value))}
            placeholder='Enter otp...'
            type="number" name="code1" id="" />
            <span className='text-red-500'>{ error}</span>
            </div>

        <button className='w-full mt-1 text-lg  text-white bg-gray-900 p-1 rounded font-semibold
      hover:bg-gray-500' type='submit'>Verify </button>
</form>
        </div>
    // </FormProvider>
  )
}

export default VerifyForm