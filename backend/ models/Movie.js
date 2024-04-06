const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    movieName: {
        type: String,
        required: true,
    },
    tmdbId: {
        type: String,
        required: true,
    },
    interestedUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
}, {
    timestamps: true
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
