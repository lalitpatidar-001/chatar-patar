const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema(
    {
        groupName :{
            type:String,
            required:true
        },
        members:{
            type:mongoose.Schema.ObjectId,
            ref:"User"
        }
},{timestamps:true})