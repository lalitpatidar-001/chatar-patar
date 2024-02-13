const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { generateToken } = require("../token/token");
const bcrypt = require("bcryptjs");
const crypto = require("crypto")
const filterObject = require("../utils/filterObject");
const otp = require("otp-generator");
const { promisify } = require("util");
const { sendVerifyOTPEmail, sendResetPasswordLinkEmail } = require("../services/mailer");



// login user
const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) return res.staus(400).json({ msg: "both email and password are required" });

    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password,user.password)) return res.status(400).json({ msg: "invalid credentials" });


    //token generate
    const token = generateToken(user._id);

    return res.status(200).json({
        msg: "logged successfully",
        token,
        user_id:user._id
    })
}

const registerUser = async (req, res, next) => {
    console.log("in register")
    const { firstName,
        lastName,
        email,
        password } = req.body;
    // console.log(req.body)

    const existing_user = await User.findOne({ email: email });

    // 1.  user existed and verified
    if (existing_user && existing_user.verified) {
        console.log("in register - new user")
        return res.status(400).json({
            status: "error",
            message: "email already in user , please login"
        })
    }
    //2, user existed but not verified
    else if (existing_user && !existing_user.verified) {
        console.log("in register -  user & not verified")
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 12);
        }
        const updatedUser = await User.findOneAndUpdate({ email }, req.body, { new: true, validateModifiedOnly: true });
        req.userId = updatedUser._id
        next(); // to sendOtp method
    }
    //3. if user not exist and not verified
    else {
        console.log("in register - new user & not verified")
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 12);
        }
        const newUser = await User.create(req.body);
        //TODO-> generate otp and send email to user
        req.userId = newUser._id;
        next(); // to sendOtp method
    }
};

const sendOtp = async (req, res, next) => {
    console.log("in send otp")
    const { userId } = req;
    const new_otp = otp.generate(6,
        {
            upperCaseAlphabets: false, lowerCaseAlphabets: false,
            specialChars: false
        });
    let hash_new_otp = ""
    if (new_otp) {
        hash_new_otp = bcrypt.hashSync(new_otp, 12);
    }
    console.log("user id ", userId)
    const otp_expiry_time = Date.now() + 10 * 60 * 1000 // 10 min expiry time

    const userDetails = await User.findByIdAndUpdate(userId, { otp: hash_new_otp, otp_expiry_time });

    console.log(userDetails)
    // TODO -> send email to user
    await sendVerifyOTPEmail(userDetails.email, userDetails.firstName, new_otp, 10)

    res.status(200).json({
        status: "success",
        message: "OTP Sent Successfully"
    });
};

const verifyOtp = async (req, res, next) => {
    // verify OTP and update user record
    console.log("called")
    const { email,OTPcode:otp } = req.body;
    console.log(req.body)
    console.log(otp,email)
    const date = Date.now();
    // console.log("date", date);
    const expiryTime = new Date(date);
    const user = await User.findOne({ email, otp_expiry_time: { $gt: expiryTime } });
    // console.log(user)
    if (!user) {
        return res.status(400).json({
            status: "error",
            message: "Email is Invalid or OTP expired"
        });
    }

    // Compare the OTPs
    console.log(otp, user.otp)
    const isOtpValid = await bcrypt.compare(String(otp), user.otp);
    if (!isOtpValid) {
        return res.status(400).json({
            status: "error",
            message: "Invalid OTP",
            user_id:user._id
        });
    }

    // OTP is correct
    user.verified = true;
    // reset value
    user.otp = undefined;
    // update user
    await user.save();

    // generate token
    const token = generateToken(user._id);

    res.status(200).json({
        status: "success",
        message: "OTP verified successfully",
        token,
    });
};

const protect = async (req, res, next) => {
    // get JWT token and chekc if it's there
    // console.log(req.headers.authorization)
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    //  else if (req.cookies.jwt) {
    //     token = req.cookies.jwt;
    // }
    else {
        return res.status(400).json({
            status: "error",
            message: "You are not logged in, Please log in to get access"
        })
    }


    // verification of token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);

    // check if user still exist 
    const this_user = await User.findById(decoded.userId);

    if (!this_user) {
        res.status(400).json({
            status: "error",
            message: "the user doesn't exist"
        });
    }

    // check if user changed their password after token was issued
    if (this_user.changedPasswordAfter(decoded.iat)) {
        res.status(400).json({
            status: "error",
            message: "User recently updated password! Please log in again"
        })
    };

    // pass
    req.user = this_user;
    next();

}

const forgotPassword = async (req, res, next) => {
    // console.log(req.body.email)
    // get user email
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        console.log("step 1")
        if (!user) {
            console.log("step :error1")
            return res.status(400).json({
                status: "error",
                message: "now user with given email address"
            });
        }

            // generate the random reset token
            console.log("step 2")
            // const resetToken = user.createPasswordResetToken()
            const resetToken = crypto.randomBytes(32).toString("hex")

            user.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    
            user.passwordResetExpires=Date.now()+10*60*1000;  // 10 min to expires

            const resetURL = `http://localhost:3000/auth/new-password?token=${resetToken}`
            console.log("step 3")
            try {
                // TODO-> send email with reset URL
                await user.save();
                console.log("email sending")
                await sendResetPasswordLinkEmail(user.email,resetURL,10)
                res.status(200).json({
                    status: "success",
                    message: "reset password link sent to email"
                })

            } catch (error) {
                console.log(error)
                console.log("step error:2")
                user.passwordResetToken = undefined;
                user.passwordResetExpires = undefined;

                await user.save({ validateBeforeSave: false });

                res.status(500).json({
                    status: "error",
                    message: "There was an error sending the email, Please try again later"
                });
            }
       
    } catch (error) {
        console.log(error)
    }



}
const resetPassword = async (req, res, next) => {
    console.log("body" , req.body)
    // get user based on token
    const hashedToken = crypto
        .createHash("sha256")
        .update(req.body.token)
        .digest("hex");
        console.log("hashedToken",hashedToken)

        const date = Date.now();
        console.log("date", date);
        const expiryTime = new Date(date);
        
    const user = await User.findOne(
        {
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt:  expiryTime  }
        });

         console.log("user",user)
    // if token has exprired  or time is expired
    if (!user) {
        return res.status(400).json({
            status: "error",
            message: "token is invalid or expired",
        });
    }

    // updating password and confirmPassword
    const hashedPassword =  bcrypt.hashSync(String(req.body.newPassword), 12);
    user.password = hashedPassword;
    user.passwordConfirm = req.body.passwordConfirm;

    //  reset fields
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    // Login the user again and send new jwt token
    // TODO -> send email to notify about password reset
    const token = generateToken(user._id);
    return res.status(200).json({
        status: "success",
        message: "password reseted successfully",
        token
    })


}

module.exports = {
    loginUser,
    registerUser,
    sendOtp,
    verifyOtp,
    protect,
    forgotPassword,
    resetPassword
}