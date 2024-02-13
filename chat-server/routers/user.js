const router = require("express").Router();
const { protect } = require("../controllers/auth");
const {updateMe, getUsers, getFriends, getFriendRequest, getUser} = require("../controllers/user");

router.patch("/update-me",
                protect,//token verification 
                updateMe);
router.get("/get-users",protect , getUsers)
router.get("/get-user/:id",protect , getUser)
router.get("/get-friends",protect , getFriends)
router.get("/get-friend-requests",protect , getFriendRequest)
module.exports = router