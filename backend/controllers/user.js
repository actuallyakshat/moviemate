const User = require("../models/User");
exports.updateUser = async (req, res) => {
  const { id, updates } = req.body;
  const user = awaitUser.findById(id);
  updates[onboardingCompleted] = true;
  try {
    const user = await User.updateOne({ _id: id }, updates);
    res.status(200).json({ success: true, message: "User updated", user });
  } catch (err) {
    console.err(err);
    res
      .status(500)
      .json({ success: false, message: "Server error while updating user" });
  }
};
exports.deleteUser = async (req, res) => {
  const { id } = req.body;
  try {
    await User.deleteOne({ _id: id });
    res.status(200).json({ success: true, message: "User deleted" });
  } catch (err) {
    console.err(err);
    res
      .status(500)
      .json({ success: false, message: "Server error while deleting user" });
  }
};
