const express = require("express");

const router = express.Router();
const {
  getOrCreateUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

router.post("/details", getOrCreateUser);
router.put("/update", updateUser);
router.delete("/delete", deleteUser);
module.exports = router;
