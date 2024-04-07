const express = require("express");
const router = express.Router();

const {
  sendFriendReq,
  cancelFriendReq,
  acceptFriendReq,
  rejectFriendReq,
  getAllFriends,
  getPendingRequests,
  removeFriend,
} = require("../controllers/friendship");

// Create
router.post("/sendFriendRequest", sendFriendReq);

// Read
router.post("/getAllFriends", getAllFriends);
router.post("/getPendingRequests", getPendingRequests);

// Update
router.post("/acceptFriendRequest", acceptFriendReq);
router.post("/rejectFriendRequest", rejectFriendReq);

// Delete
router.post("/removeFriend", removeFriend);
router.post("/cancelFriendRequest", cancelFriendReq);

module.exports = router;
