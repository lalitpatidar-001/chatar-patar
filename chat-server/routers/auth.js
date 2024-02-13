const { loginUser, registerUser, sendOtp, verifyOtp, forgotPassword, resetPassword } = require("../controllers/auth");

const router = require("express").Router();

router.post("/login",loginUser);
router.post("/register",registerUser,sendOtp);
router.post("/send-otp",sendOtp);
router.post("/verify-otp",verifyOtp);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password",resetPassword);

module.exports = router;