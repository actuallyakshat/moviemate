const express = require("express");
const router = express.Router();

const { imageUpload, imageDelete } = require("../controllers/fileUpload.js");

router.post("/imageUpload", imageUpload);
router.post("/imageDelete", imageDelete);
module.exports = router;
