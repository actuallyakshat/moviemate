const Friendship = require("../ models/Friendship");
const User = require("../ models/User");
const Movie = require("../ models/Movie");

// Keypoints:
// user1 : The one who send the request
// user2 : The one who receives the request

exports.sendFriendReq = async (req, res) => {
  try {
    const userId = req.body.userId;
    const friendId = req.body.friendId;
    const tmdbId = req.body.tmdbId;
    const movieName = req.body.movieName;
    if (!userId || !friendId || !tmdbId) {
      return res.status(400).json({
        success: false,
        message: "userId, friendId tmdbId and movie name are required",
      });
    }

    // Checking if the friend request already exists or they are already friends
    const existingRequest = await Friendship.findOne({
      $or: [
        { user1: userId, user2: friendId },
        { user1: friendId, user2: userId },
      ],
    });
    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: "Friendship request already exist.",
      });
    }

    // Checking movie exists or not
    const existingMovie = await Movie.findOne({ tmdbId: tmdbId });
    let movie;
    if (existingMovie) {
      movie = existingMovie;
    } else {
      movie = await Movie.create({
        movieName: movieName,
        tmdbId: tmdbId,
      });
    }
    const movieId = movie._id;
    // Creating new friend request
    const newRequest = await Friendship.create({
      user1: userId,
      user2: friendId,
      movieId: movieId,
    });
    if (newRequest) {
      const user1 = await User.findByIdAndUpdate(
        userId,
        { $push: { friends: newRequest._id } },
        { new: true }
      );
      const user2 = await User.findByIdAndUpdate(
        friendId,
        { $push: { friends: newRequest._id } },
        { new: true }
      );
      return res.status(200).json({
        newRequest: newRequest,
        success: true,
        message: "Friend request sent successfully.",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Unable to send friend request.Try again after sometime.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error while sending friend request.",
    });
  }
};

exports.cancelFriendReq = async (req, res) => {
  try {
    const userId = req.body.userId;
    const friendId = req.body.friendId;
    if (!userId || !friendId) {
      return res.status(400).json({
        success: false,
        message: "userId and friendId are required",
      });
    }

    // Checking if the friend request exists
    const pendingRequest = await Friendship.findOne({
      user1: userId,
      user2: friendId,
    });
    if (!pendingRequest) {
      return res.status(404).json({
        success: false,
        message: "No pending friend request found from user to friend.",
      });
    }

    // Cancelling Friend Request
    await Friendship.findByIdAndDelete(pendingRequest._id);

    const updatedUser1 = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: pendingRequest._id } },
      { new: true }
    );
    const updatedUser2 = await User.findByIdAndUpdate(
      friendId,
      { $pull: { friends: pendingRequest._id } },
      { new: true }
    );

    if (!updatedUser1 || !updatedUser2) {
      return res.status(500).json({
        success: false,
        message:
          "Error updating users' friends arrays while cancelling friend request.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Friend request cancelled successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error while unsending friend request.",
    });
  }
};

exports.acceptFriendReq = async (req, res) => {
  try {
    const userId = req.body.userId;
    const friendId = req.body.friendId;
    if (!userId || !friendId) {
      return res.status(400).json({
        success: false,
        message: "userId and friendId are required",
      });
    }
    // Checking if the friend request exists and accept
    const pendingRequest = await Friendship.findOneAndUpdate(
      { user1: friendId, user2: userId },
      { $set: { status: "accepted" } },
      { new: true }
    );
    if (!pendingRequest) {
      return res.status(404).json({
        success: false,
        message: "No pending friend request from friend to user.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Friend request accepted successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error while accepting friend request.",
    });
  }
};

exports.rejectFriendReq = async (req, res) => {
  try {
    const userId = req.body.userId;
    const friendId = req.body.friendId;
    if (!userId || !friendId) {
      return res.status(400).json({
        success: false,
        message: "userId and friendId are required",
      });
    }

    // Checking if the friend request exists
    const pendingRequest = await Friendship.findOne({
      user1: friendId,
      user2: userId,
    });
    if (!pendingRequest) {
      return res.status(404).json({
        success: false,
        message: "No pending friend request found from friend to user.",
      });
    }

    // Cancelling Friend Request
    await Friendship.findByIdAndDelete(pendingRequest._id);

    const updatedUser1 = await User.findByIdAndUpdate(
      friendId,
      { $pull: { friends: pendingRequest._id } },
      { new: true }
    );
    const updatedUser2 = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: pendingRequest._id } },
      { new: true }
    );

    if (!updatedUser1 || !updatedUser2) {
      return res.status(500).json({
        success: false,
        message:
          "Error updating users' friends arrays while rejecting friend request.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Friend request rejected successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error while rejecting friend request.",
    });
  }
};

exports.removeFriend = async (req, res) => {
  try {
    const userId = req.body.userId;
    const friendId = req.body.friendId;
    if (!userId || !friendId) {
      return res.status(400).json({
        success: false,
        message: "userId and friendId are required",
      });
    }

    // Checking if they are friends or not
    const existingRequest = await Friendship.findOne({
      $or: [
        { user1: userId, user2: friendId },
        { user1: friendId, user2: userId },
      ],
    });
    if (!existingRequest) {
      return res.status(400).json({
        success: false,
        message: "Friendship between the users does not exist.",
      });
    }

    await Friendship.findByIdAndDelete(existingRequest._id);

    const updatedUser1 = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: existingRequest._id } },
      { new: true }
    );
    const updatedUser2 = await User.findByIdAndUpdate(
      friendId,
      { $pull: { friends: existingRequest._id } },
      { new: true }
    );

    if (!updatedUser1 || !updatedUser2) {
      return res.status(500).json({
        success: false,
        message: "Error updating users' friends arrays while removing friend.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Friend removed successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error while removing friend.",
    });
  }
};

exports.getAllFriends = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId required",
      });
    }

    const user = await User.findById(userId).populate({
      path: "friends",
      populate: {
        path: "movieId",
        model: "Movie",
      },
      match: { status: "accepted" },
    });

    if (!user || !user.friends || user.friends.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message:
          "No friends found for this user or all friendship requests are pending.",
      });
    }

    const friends = await Promise.all(
      user.friends.map(async (friendship) => {
        const friendId =
          friendship.user1.toString() !== userId
            ? friendship.user1
            : friendship.user2;
        const populatedFriend = await User.findById(friendId).exec();
        const populatedMovie = await Movie.findById(friendship.movieId).exec();
        return {
          friendshipId: friendship._id,
          friend: populatedFriend,
          movie: populatedMovie,
        };
      })
    );

    return res.status(200).json({
      success: true,
      data: friends,
      message: "Friends fetched successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error while fetching user friends'.",
    });
  }
};

exports.getPendingRequests = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId required",
      });
    }

    const user = await User.findById(userId).populate("friends");
    const friends = user.friends;

    const requestReceivedFrom = [];
    const requestSendTo = [];

    const pendingRequests = friends.filter(
      (friend) => friend.status === "pending"
    );

    await Promise.all(
      pendingRequests.map(async (friend) => {
        const friendUser =
          friend.user1.toString() === userId ? friend.user2 : friend.user1;
        const populatedFriend = await User.findById(friendUser).exec();
        const populatedMovie = await Movie.findById(friend.movieId).exec();
        const friendDetails = {
          friendshipId: friend._id,
          friend: populatedFriend,
          movie: populatedMovie,
        };
        if (friend.user1.toString() === userId) {
          requestSendTo.push(friendDetails);
        } else {
          requestReceivedFrom.push(friendDetails);
        }
      })
    );

    return res.status(200).json({
      success: true,
      requestReceivedFrom: requestReceivedFrom,
      requestSendTo: requestSendTo,
      message: "Pending requests fetched successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error while fetching pending requests.",
    });
  }
};
