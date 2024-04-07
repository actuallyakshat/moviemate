import axios from "axios";
const baseUrl = `${import.meta.env.VITE_BASEURL}`;

export const sendContactUsEmail = async (email, subject, message) => {
  try {
    const user = await axios.post(`${baseUrl}/contactUs`, {
      email,
      subject,
      message,
    });
    if (user.data.success) {
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
    console.error("Error occoured while contacting with admin", error);
    return {
      success: false,
    };
  }
};
