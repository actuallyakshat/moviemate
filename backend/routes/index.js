const express = require("express");

const router = express.Router();
const userRouter = require("./user");
const friendshipRouter = require("./friendship");
const movieRouter = require("./movie");
const systemRouter = require("./system");
const chatRouter = require("./chat");
router.use("/user", userRouter);
router.use("/friend", friendshipRouter);
router.use("/movie", movieRouter);
router.use("/chat", chatRouter);
router.use("", systemRouter);
module.exports = router;
