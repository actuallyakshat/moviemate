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
router.get("/getAllFriends", getAllFriends);
router.get("/getPendingRequests", getPendingRequests);

// Update
router.post("/acceptFriendRequest", acceptFriendReq);
router.post("/rejectFriendRequest", rejectFriendReq);

// Delete
router.delete("/removeFriend", removeFriend);
router.delete("/cancelFriendRequest", cancelFriendReq);

module.exports = router;
