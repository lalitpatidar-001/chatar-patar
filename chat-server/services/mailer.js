const nodemailer = require("nodemailer");


const nodemailerConfig = (email,subject,text,html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      auth: {
        user: 'lalitpatidar388@gmail.com',
        pass: process.env.SMTP_MAIL_KEY,
      },
    });

    const mailOptions = {
      from: 'lalitpatidar388@gmail.com',
      to: email,
      subject: subject,
      text: text,
      html: html
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    }
    )
    return;

  } catch (error) {
    console.log("email not send")
    console.log(error)
  }
};

const sendVerifyOTPEmail = async (email, firstName, otp, expireTime) => {
  const html = `
<h1>hello,  this is testing</h1>
<h3>your otp is :  ${otp}</h3>
<h3>this otp will expire in :  ${expireTime} minutes</h3>
`
const subject = 'OTP Verification';
const text =  'please verify yourself';
  nodemailerConfig(
    email,
    subject,
    text,
    html
    );
};

 const sendResetPasswordLinkEmail = async (email,link,expireTime)=>{
  const html = `
  <h1>Res</h1>
  <h3>reset link is :  <a href="${link}" >reset-password</a></h3>
  <h3>this otp will expire in :  ${expireTime} minutes</h3>
  `
  const subject = 'Reset Password';
  const text =  'Click link to reset password';
  nodemailerConfig(email,subject,text,html)
}


module.exports = {
  sendVerifyOTPEmail,
  sendResetPasswordLinkEmail,

}