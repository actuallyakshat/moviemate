import axios from "axios";
const baseUrl = `${import.meta.env.VITE_BASEURL}`;

export const getUserDetails = async (fullName, email, setUser) => {
  try {
    const user = await axios.post(`${baseUrl}/user/details`, {
      fullName,
      email,
    });
    if (user.data.success) {
      setUser(user.data.user);
      return {
        success: true,
      };
    } else {
      console.error(user.data.message);
      return {
        success: false,
        message: user.data.message,
      };
    }
  } catch (error) {
      console.error("Error occoured while fetching user details", error);
      return {
      success: false,
    };
  }
};

export const getDetailsById = async (userId) => {
  try {
    const response = await axios.post(`${baseUrl}/user/getDetailsById`, {
      userId,
    });
    if (response.data.success) {
      return {
        success: true,
        user: response.data.user,
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
}

// update user details
export const updateUserDetails = async (userId, data, setUser) => {
  try {
    const response = await axios.put(`${baseUrl}/user/update`,{
      userId,
      data,
    });
    if (response.data.success) {
      setUser(response.data.user);
      return {
        success: true,
        message: "Profile updated successfully",
      };
    } else {
      return {
        success: false,
        message: `${response.message}: ${response.error.message}`,
      };
    }
  } catch (error) {
    console.error("Error occoured while updating user details", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

