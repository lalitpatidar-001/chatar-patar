import VerifyForm from "./VerifyForm"
const VerifyOTP = () => {
    // get email from stote

  return (
    <div className='flex flex-col items-center '>
        <div>
            <div className="flex flex">
                <h1>Please verify OTP</h1>
                <span>Send to email (patidarlalit738@gmail.com)</span>
            </div>

            {/* verify form  */}
            <VerifyForm/>
        </div>
    </div>
  )
}

export default VerifyOTP