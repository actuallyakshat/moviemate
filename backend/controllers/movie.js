const Movie = require("../ models/Movie");

exports.addOrCreateMovie = async (req, res) => {
  try {
    const { tmdbId, userId, movieName } = req.body;
    let movie = await Movie.findOne({ tmdbId: tmdbId });
    if (movie) {
      movie.interestedUsers.push(userId);
      await movie.save();

      return res.status(200).json({
        success: true,
        message: "User added and Movie already exists!",
        movie: movie,
      });
    } else {
      const newMovie = await Movie.create({
        movieName: movieName,
        tmdbId: tmdbId,
        interestedUsers: [userId],
      });

      return res.status(201).json({
        success: true,
        message: "User added and New Movie created!",
        movie: newMovie,
      });
    }
  } catch (error) {
    console.error("Error occurred while adding or creating movie:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getAllInterestedUsers = async (req, res) => {
  try {
    const { tmdbId } = req.body;
    const movie = await Movie.findOne({ tmdbId }).populate("interestedUsers");
    if (!movie) {
      return res.status(202).json({
        success: false,
        interestedUsers: [],
        message: "Movie not found",
      });
    }

    return res.status(200).json({
      success: true,
      interestedUsers: movie.interestedUsers,
    });
  } catch (error) {
    console.error("Error occurred while fetching interested users:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.removeUserFromInterested = async (req, res) => {
  try {
    //This movieId is the tmdbId coming from the frontend and not the _id of the movie
    const { movieId, userId } = req.body;
    //find the movie by tmdbId and then delete it.
    const movie = await Movie.findOne({ tmdbId: movieId });
    // const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    // Check if the user is in the interestedUsers array
    const index = movie.interestedUsers.findIndex(
      (user) => user.toString() === userId
    );
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "User is not in the interested list for this movie",
      });
    }

    // Remove the user from the interestedUsers array
    movie.interestedUsers.splice(index, 1);

    // Save the changes
    await movie.save();

    if (movie.interestedUsers.length === 0) {
      // If no users are interested anymore, delete the movie
      await Movie.findByIdAndDelete(movie._id); //fix this
      return res.status(200).json({
        success: true,
        message:
          "User removed from interested list and movie deleted as no users are interested anymore",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "User removed from interested list for this movie",
      });
    }
  } catch (error) {
    console.error(
      "Error occurred while removing user from interested list:",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
