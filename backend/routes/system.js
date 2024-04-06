const express = require("express");
const router = express.Router();

const { contactAdmin } = require("../controllers/contact");

router.post("/contactUs", contactAdmin);

module.exports = router;
