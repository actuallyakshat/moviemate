import axios from "axios";
const baseUrl = `${import.meta.env.VITE_BASEURL}`;

export const getPendingRequest = async (userId, setIncomingRequests, setOutgoingRequests) => {
    try {
      const response = await axios.post(`${baseUrl}/friend/getPendingRequests`, {
        userId,
      });
      console.log("Real Response", response.data);
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
