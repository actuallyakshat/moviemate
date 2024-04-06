import axios from "axios";
const baseUrl = `${import.meta.env.VITE_BASEURL}`;

export const getUserDetails = async (userId) => {
    try {
      const user = await axios.get(`${baseUrl}/user/details`, {
        userId,
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
        };
      }
    } catch (error) {
      console.error("Error occoured while fetching user details", error);
      return {
        success: false,
        message: error.message,
      };
    }
  };
