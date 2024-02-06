import axios from "axios";
import fs from "fs";

const createImage = async (imageFile: any) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  try {
    const response = await axios.post(
      "http://localhost:3001/createImage",
      formData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default createImage;
