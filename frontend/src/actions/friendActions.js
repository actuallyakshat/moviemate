import axios from "axios";
const baseUrl = `${import.meta.env.VITE_BASEURL}`;

export const getPendingRequest = async (
  userId,
  setIncomingRequests,
  setOutgoingRequests
) => {
  try {
    const response = await axios.post(`${baseUrl}/friend/getPendingRequests`, {
      userId,
    });
    if (response.data.success) {
      setIncomingRequests(response.data.requestReceivedFrom);
      setOutgoingRequests(response.data.requestSendTo);
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
    console.error("Error occoured while fetching user details by id", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const acceptFriendRequest = async (userId, friendId) => {
  try {
    const response = await axios.post(`${baseUrl}/friend/acceptFriendRequest`, {
      userId,
      friendId,
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
    console.error("Error occoured while accepting friend request.", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const declineFriendRequest = async (userId, friendId) => {
  try {
    const response = await axios.post(`${baseUrl}/friend/rejectFriendRequest`, {
      userId,
      friendId,
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
    console.error("Error occoured while declining friend request.", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const cancelFriendRequest = async (userId, friendId) => {
  try {
    const response = await axios.post(`${baseUrl}/friend/cancelFriendRequest`, {
      userId,
      friendId,
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
    console.error("Error occoured while cancelling friend request.", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const removeFriend = async (userId, friendId) => {
  try {
    const response = await axios.post(`${baseUrl}/friend/removeFriend`, {
      userId,
      friendId,
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
    console.error("Error occoured while removing friend.", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const sendFriendRequest = async (
  userId,
  friendId,
  tmdbId,
  movieName
) => {
  try {
    const response = await axios.post(`${baseUrl}/friend/sendFriendRequest`, {
      userId,
      friendId,
      tmdbId,
      movieName,
    });
    if (response.data.success) {
      return {
        data: response.data.newRequest,
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
    console.error("Error occoured while sending friend request.", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getFriends = async (userId, setFriends) => {
  try {
    const response = await axios.post(`${baseUrl}/friend/getAllFriends`, {
      userId,
    });
    if (response.data.success) {
      setFriends(response.data.data);
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
    console.error("Error occoured while fetching friends.", error);
    return {
      success: false,
      message: error.message,
    };
  }
};
