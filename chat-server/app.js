const express = require("express");
const app = express();
const morgan = require("morgan"); // endpoint, time tp response, response
require("dotenv").config();
const routes = require("./routers/index")


const rateLimit = require("express-rate-limit");// limit no. of request from one IP address

const helmet = require("helmet");// set header for security purpose

const mongoSanitize = require("express-mongo-sanitize");// sanitize the data

const xss = require("xss"); // sanitize the untrusted html data
const bodyParser = require("body-parser");
const cors = require("cors");


// MIDDLE-WARES
// app.use(xss());
app.use(express.json({limit:"10kb"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(helmet());
app.use(morgan("dev"));
app.use(cors({
    origin:"*",
    methods:['GET','POST','PATCH','DELETE','PUT'],
    credentials:true,
}))
const limiter = rateLimit(
    {
        max:3000,
        windowMs:60*60*1000, // in 1 hour 3000 request
        message:"too many request from this ip, please try again in an hour"
    }
);

app.use("/tawk",limiter);
app.use(express.urlencoded({extended:true}));
app.use(mongoSanitize());


app.use(routes)


module.exports = app