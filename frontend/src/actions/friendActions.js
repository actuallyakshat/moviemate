
import axios from "axios";
const baseUrl = `${import.meta.env.VITE_BASEURL}`;

export const getPendingRequest = async (userId) => {
    try {
      const response = await axios.post(`${baseUrl}/friend/getPendingRequests`, {
        userId,
      });
      if (response.data.success) {
        return {
          success: true,
          requestReceivedFrom: response.data.requestReceivedFrom,
          requestSendTo: response.data.requestSendTo,
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