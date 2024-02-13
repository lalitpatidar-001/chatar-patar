const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"first name is required"]
    },
    lastName:{
        type:String,
        required:[true,"last name is required"]
    },
    avatar:{
        type:String,
    },
    email:{
        type:String,
        required:[true,"email is required"],
        validate:{
            validator:function (email){
                return String(email).toLowerCase().match("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
            },
            message:(props)=> `Email ${props.value} is invalid`
        }
    },
    password:{
        type:String,
    },
    passwordConfirm:{
        type:String
    },
    passwordChangedAt:{
            type:Date,
    },
    passwordResetToken:{
        type:String,
    },
    passwordResetExpires:{
        type:Date,
    },
    verified:{
        type:Boolean,
        default:false
    },
    socket_id:{
        type:String,

    },
    friends:[
        {type:mongoose.Schema.Types.ObjectId, 
        ref:"User"}
    ],
    otp:{
        type:String
    },
    otp_expiry_time:{
        type:Date
    },
    status:{
        type:String,
        enum:["Online","Offline"],
    }

},
{timestamps:true});

UserSchema.methods.correctPassword = async function (candidatePass , userPass){
    console.log(candidatePass,userPass)
        return await bcrypt.compare(candidatePass,userPass)
}

UserSchema.methods.createPasswordResetToken = function(){
    
        const resetToken = crypto.randomBytes(32).toString("hex")

        this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        this.passwordResetExpires=Date.now()+10*60*1000;  // 10 min to expires

        return resetToken
}

UserSchema.methods.changedPasswordAfter=function(timestamps){
    return timestamps < this.passwordChangedAt;
}

module.exports = mongoose.model("User",UserSchema);
