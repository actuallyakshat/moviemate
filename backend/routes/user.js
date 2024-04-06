const express = require("express");
const router = express.Router();
const {
  createUser,
  updateUser,
  deleteUser,
  getDetails,
} = require("../Controllers/user");
router.post("/create", createUser);
router.post("/details", getDetails);
router.put("/update", updateUser);
router.delete("/delete", deleteUser);
module.exports = router;
