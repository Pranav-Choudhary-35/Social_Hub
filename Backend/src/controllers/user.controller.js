const followModel = require('../models/follow.model');
const userModel = require('../models/user.model');

// Send follow request
async function followUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followerUsername === followeeUsername) {
    return res.status(400).json({ message: "You cannot follow yourself" });
  }

  const isAlreadyFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername
  });

  if (isAlreadyFollowing) {
    return res.status(200).json({
      message: "Follow request already exists",
      follow: isAlreadyFollowing
    });
  }

  const isFolloweeExist = await userModel.findOne({ username: followeeUsername });
  if (!isFolloweeExist) {
    return res.status(404).json({ message: "User does not exist" });
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
    status: "pending"
  });

  res.status(201).json({
    message: "Follow request sent successfully, wait for approval",
    followRecord
  });
}

// Accept/Reject follow request
async function respondFollowRequestController(req, res) {
  const followId = req.params.followId;
  const { status } = req.body; // "accepted" or "rejected"

  if (!["accepted", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  const follow = await followModel.findById(followId);
  if (!follow) {
    return res.status(404).json({ message: "Follow request not found" });
  }

  if (follow.followee !== req.user.username) {
    return res.status(403).json({ message: "Not authorized" });
  }

  follow.status = status;
  await follow.save();

  res.status(200).json({
    message: `Follow request ${status}`,
    follow
  });
}

// Unfollow (only if accepted)
async function unfollowUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const isUserFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
    status: "accepted"
  });

  if (!isUserFollowing) {
    return res.status(200).json({
      message: `You are not following user ${followeeUsername}`
    });
  }

  await followModel.findByIdAndDelete(isUserFollowing._id);
  res.status(200).json({
    message: `You have unfollowed user ${followeeUsername} successfully`
  });
}

// Get followers (only accepted)
async function getFollowersController(req, res) {
  const username = req.params.username;

  const followers = await followModel.find({
    followee: username,
    status: "accepted"
  });

  res.status(200).json({
    message: "Followers fetched successfully",
    followers
  });
}

// Get following (only accepted)
async function getFollowingController(req, res) {
  const username = req.params.username;

  const following = await followModel.find({
    follower: username,
    status: "accepted"
  });

  res.status(200).json({
    message: "Following fetched successfully",
    following
  });
}

module.exports = {
  followUserController,
  respondFollowRequestController,
  unfollowUserController,
  getFollowersController,
  getFollowingController
};
