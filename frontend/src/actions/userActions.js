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
