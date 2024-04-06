const express = require("express");

const router = express.Router();
const {
  getOrCreateUser,
  getDetailsById,
  updateUser,
  deleteUser,
} = require("../controllers/user");

router.post("/details", getOrCreateUser);
router.post("/getDetailsById", getDetailsById)
router.put("/update", updateUser);
router.delete("/delete", deleteUser);
module.exports = router;
