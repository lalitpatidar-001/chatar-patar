const mongoose = require("mongoose");

const FriendRequestSchema = new mongoose.Schema(
    {
     sender:{
        type:mongoose.Schema.ObjectId,ref:"User"
     },
     recipient:{
        type:mongoose.Schema.ObjectId,ref:"User"
     },
     
}
,{
    timestamps:true
});

module.exports = mongoose.model("FriendRequest",FriendRequestSchema);