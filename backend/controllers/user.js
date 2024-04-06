// const User = require("../models/User");
const User = require("../ models/User")

exports.createUser = async (req, res) => {
  try {
    const { fullName, email } = req.body;

    // Checking user already exist or not
    const oldUser = await User.findOne({ email: req.email });
    if (!oldUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists!",
      });
    }

    // Creating new user
    const newUser = await User.create({
      fullName,
      email,
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully!",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error while creating user",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id, updates } = req.body;
    updates[onboardingCompleted] = true;
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
