const User = require("../models/User");
const FriendRequest = require("../models/FriendRequest");
const filterObject = require("../utils/filterObject");


const getUser = async (req,res,next)=>{
    console.log("GET USER CALLED")
    const {id} = req.params;
    try{
            const user = await User.findById(id).select("firstName lastName _id status ");
            console.log("user ---> ",user);
            res.status(200).json({
                status:"success",
                data:user,
                messag:"user retrieved successfully"
            })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            status:"error",
            message:"internal server error"
        })
    }
}

const updateMe = async (req, res, next) => {

    const { user } = req;

    const filteredBody = filterObject(req.body, "firstName", "lastName", "about", "avatar");
    try {
        const updatedUser = await User.findByIdAndUpdate(user._id, filteredBody, { new: true, validateModifiedOnly: true });

    return res.status(200).json({
        status: 'success',
        data: updatedUser,
        message: "Profile Updated Successfully"
    });
    } catch (error) {
        console.log(error)
    }
}

// get users for friend request
const getUsers = async (req, res, next) => {
    try {
        const all_users = await User.find({ verified: true })
            .select("firstName lastName _id");

        const this_user = req.user;
        const remaining_user = all_users.filter((user) => !this_user.friends.includes(user._id)// dont show users that are already freinds
            &&
            user.id.toString() !== req.user._id.toString() // not sending request to myself
        )

        res.status(200).json({
            status: "success",
            data: remaining_user,
            message: "users found successfully"
        })
    } catch (error) {
        console.log(error)
    }
};

// get friend list
const getFriends = async(req,res,next)=>{
    try {
        const this_user = await User.findById(req.user.id).populate("friends","_id firstName lastName "); // populate friends of particular user

        res.status(200).json({
            status:"success",
            data:this_user.friends,
            message:"friends found successfullu"
        })
    } catch (error) {
        console.log(error)
    }
};

// get friend request 
const getFriendRequest = async(req,res,next)=>{
    console.log(req.user._id)
    try {
        
        const requests = await FriendRequest.find({recipient:req.user._id})
        .populate("sender",
        "_id firstName lastName")
        ; // users who requested to me 
console.log("requests",requests)
        res.status(200).json({
            status:"success",
            data:requests,
            message:"requests retrieved successfully"
        })

    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    updateMe,
    getUsers,
    getFriends,
    getFriendRequest,
    getUser

}