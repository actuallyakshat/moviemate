const express = require("express");

const router = express.Router();
const userRouter = require("./user");
const friendshipRouter = require("./friendship");
const movieRouter = require("./movie");
const systemRouter = require("./system");

router.use("/user", userRouter);
router.use("/friend", friendshipRouter);
router.use("/movie", movieRouter);
router.use("", systemRouter);
module.exports = router;
