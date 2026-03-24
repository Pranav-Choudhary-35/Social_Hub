const express=require('express');
const userRouter=express.Router();
const UserController=require('../controllers/user.controller')
const identifyUser=require('../middleware/auth.middleware');

// Send follow request (status = pending)
userRouter.post("/follow/:username", identifyUser, UserController.followUserController);

// Unfollow user (only if accepted)
userRouter.delete("/unfollow/:username", identifyUser, UserController.unfollowUserController);

// Accept/Reject follow request
userRouter.patch("/follow/respond/:followId", identifyUser, UserController.respondFollowRequestController);

// Get followers (only accepted)
userRouter.get("/followers/:username", identifyUser, UserController.getFollowersController);

// Get following (only accepted)
userRouter.get("/following/:username", identifyUser, UserController.getFollowingController);


module.exports=userRouter;