const User = require("../ models/User");

exports.getOrCreateUser = async (req, res) => {
  try {
    const { fullName, email, profileImg } = req.body;
    // Checking user already exist or not
    const oldUser = await User.findOne({ email: email })
      .populate("friends")
      .populate("files");
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
      profileImage: profileImg,
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
    const user = await User.findOne({ _id: req.body.userId })
      .populate("friends")
      .populate("files");
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

    if (data) {
      console.log("Updating user", data);
      data.onboardingCompleted = true;
      // Update the user and populate all referring fields
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        data,
        { new: true } // Return the modified document rather than the original
      ).populate("friends files"); // Populate all referring fields

      // Check if the user exists and was updated
      if (updatedUser) {
        console.log("Updated user:", updatedUser);
        res
          .status(200)
          .json({ success: true, message: "User updated", user: updatedUser });
      } else {
        // If no user found
        res.status(404).json({ success: false, message: "User not found" });
      }
    } else {
      res.status(400).json({ success: false, message: "No data provided" });
    }
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
