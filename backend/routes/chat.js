const express = require("express");
const router = express.Router();
const { getMessages, sendMessage } = require("../controllers/chat");
router.get("/:userId", getMessages);
router.post("/send", sendMessage);
