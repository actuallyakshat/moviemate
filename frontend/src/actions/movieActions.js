import axios from "axios";
const baseUrl = `${import.meta.env.VITE_BASEURL}`;

const getAllInterestedUsers = async (movieId) => {
  try {
    console.log(movieId);
    console.log(`${baseUrl}/movie/getAllInterestedUsers`);
    const response = await axios.post(
      `${baseUrl}/movie/getAllInterestedUsers`,
      {
        tmdbId: movieId,
      }
    );
    if (response.data.success) {
      return {
        success: true,
        interestedUsers: response.data.interestedUsers,
      };
    } else {
      return {
        success: false,
        interestedUsers: [],
        message: response.data.message,
      };
    }
  } catch (error) {
    console.error("Error occoured while fetching user details by id", error);
    return {
      success: false,
    };
  }
};

const addInterestedUser = async (movieId, userId, movieName) => {
  try {
    console.log(movieId, userId, movieName);
    const response = await axios.post(`${baseUrl}/movie/addMeForMovie`, {
      tmdbId: movieId,
      userId: userId,
      movieName: movieName,
    });
    if (response.data.success) {
      return {
        success: true,
        message: response.data.message,
      };
    } else {
      return {
        success: false,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.error(error);
  }
};

const removeInterestedUser = async (movieId, userId) => {
  try {
    const response = await axios.post(`${baseUrl}/movie/removeMeFromMovie`, {
      movieId,
      userId,
    });
    if (response.data.success) {
      return {
        success: true,
        message: response.data.message,
      };
    } else {
      return {
        success: false,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.error("Error occurred while removing user from interested", error);
    return {
      success: false,
    };
  }
};

export { getAllInterestedUsers, addInterestedUser, removeInterestedUser };
