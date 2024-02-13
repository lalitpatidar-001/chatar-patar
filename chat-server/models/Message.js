const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
    {
        conversation_id:{
            type:mongoose.Schema.ObjectId,
            ref:"OneToOneMessage"
        },
        to: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        },
        from: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        },
        type: {
            type: String,
            enum: ["Text", "Media", "Document", "Link"]
        },
        text: {
            type: String
        },
        file: {
            type: String
        },
        status:{
            type:String,
            enum:["Read","Delivered","Sent","Pending"],
            default:"Delivered"
        }

}
,{timestamps:true})

module.exports = mongoose.model("Message",MessageSchema);