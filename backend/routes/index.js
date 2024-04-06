const express = require("express");

const router = express.Router();
const userRouter = require("./user");
const friendshipRouter = require("./friendship");
const movieRouter = require("./movie");

router.use("/user", userRouter);
router.use("/friend", friendshipRouter);
router.user("/movie", movieRouter)
module.exports = router;
