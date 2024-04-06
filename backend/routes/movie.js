const express = require("express");
const router = express.Router();

const {
    addOrCreateMovie,
    removeUserFromInterested,
    getAllInterestedUsers,
} = require("../controllers/movie");

// Create
router.post("/addMeForMovie", addOrCreateMovie);

// Read
router.post("/getAllInterestedUsers", getAllInterestedUsers);

// Remove
router.post("/removeMeFromMovie", removeUserFromInterested);

module.exports = router;