const express = require("express");
const checkUser = require("../middleware/userCheck.js");

const router = express.Router();
const {
  createUser,
  updateUser,
  deleteUser,
  // getDetails,
} = require("../controllers/user");
router.post("/create", createUser);
// router.post("/details", checkUser, getDetails);
router.put("/update", checkUser, updateUser);
router.delete("/delete", checkUser, deleteUser);
module.exports = router;
