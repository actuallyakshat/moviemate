const User = require("../ models/User");


module.exports = function (req, res, next) {
  try {
    const userId = req.userId;
    User.findOne({ _id: userId }).then((user) => {
      if (user) {
        next();
      } else {
        return res
          .status(403)
          .json({ success: false, message: "User does not exist" });
      }
    });
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ success: false, message: "Error in middleware while verifying user." });
  }
};
