const Movie = require("../ models/Movie");

exports.addOrCreateMovie = async (req, res) => {
  try {
    const { movieName, tmdbId, userId } = req.body;
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

exports.removeUserFromInterested = async (req, res) => {
  try {
    const { movieId, userId } = req.body;
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    const index = movie.interestedUsers.indexOf(userId);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "User is not in the interested list for this movie",
      });
    }

    movie.interestedUsers.splice(index, 1);

    if (movie.interestedUsers.length === 0) {
      await Movie.findByIdAndDelete(movieId);
      return res.status(200).json({
        success: true,
        message:
          "User removed from interested list and movie deleted as no users are interested anymore",
      });
    } else {
      await movie.save();
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