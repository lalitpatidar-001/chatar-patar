const router = require("express").Router();
const authRoute = require("../routers/auth")
const userRoute= require("../routers/user");

// combining all routes
router.use("/auth",authRoute);
router.use("/user",userRoute);

module.exports = router;