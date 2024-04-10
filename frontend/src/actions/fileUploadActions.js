import axios from "axios";
import { getDetailsById } from "./userActions";
const baseUrl = `${import.meta.env.VITE_BASEURL}`;

export const imageUpload = async (userId, tag, file, setUser) => {
  try {
    const formData = new FormData();
    formData.append("tag", tag);
    formData.append("file", file);
    formData.append("userId", userId);

    const response = await axios.post(
      `${baseUrl}/upload/imageUpload`,
      formData
    );
    if (response.data.success) {
      const response = await getDetailsById(userId);
      console.log("outside success: ", response);
      if (response.success) {
        console.log("response: ", response);
        setUser(response.user);
      } else {
        console.error(response.message);
      }
    }
    return response;
  } catch (error) {
    console.error("Error occurred while uploading image", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const imageDelete = async (postId, imageLink, userId, setUser) => {
  try {
    const response = await axios.post(`${baseUrl}/upload/imageDelete`, {
      postId,
      imageLink,
      userId,
    });

    if (response.data.success) {
      const response = await getDetailsById(userId);
      if (response.success) {
        setUser(response.user);
      } else {
        console.error(response.message);
      }
    }
    return response;
  } catch (error) {
    console.error("Error occurred while deleting image", error);
    return {
      success: false,
      message: error.message,
    };
  }
};
