const User = require("../ models/User");

exports.getOrCreateUser = async (req, res) => {
  try {
    const { fullName, email } = req.body;

    // Checking user already exist or not
    const oldUser = await User.findOne({ email: email });
    if (oldUser) {
      return res.status(200).json({
        success: true,
        message: "User already exists!",
        user: oldUser,
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
      message: "Internal server error while getting details of user",
    });
  }
};

exports.getDetailsById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({ success: true, user: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { userId, data } = req.body;
    console.log(data);
    data.onboardingCompleted = true;
    const user = await User.updateOne({ _id: userId }, data);
    res.status(200).json({ success: true, message: "User updated", user });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server error while updating user" });
  }
};

exports.deleteUser = async (req, res) => {
  console.log(req.body);
  const { userId } = req.body;
  console.log(userId);
  try {
    await User.deleteOne({ _id: userId });
    res.status(200).json({ success: true, message: "User deleted" });
  } catch (err) {
    console.err(err);
    res
      .status(500)
      .json({ success: false, message: "Server error while deleting user" });
  }
};
