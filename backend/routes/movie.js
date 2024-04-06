const express = require("express");
const router = express.Router();

const {
    addOrCreateMovie,
    removeUserFromInterested,
} = require("../controllers/movie");

// Create
router.post("/addMeForMovie", addOrCreateMovie);

// Remove
router.post("/removeMeFromMovie", removeUserFromInterested);

module.exports = router;