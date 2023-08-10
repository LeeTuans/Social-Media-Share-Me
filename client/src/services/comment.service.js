import axiosConfig from "../../config/axiosConfig";

const lastURL = "/comments";

export const getComments = async () => {
  try {
    const response = await axiosConfig.get(`${lastURL}`);

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createComment = async ({ userId, pinId, comment }) => {
  try {
    const response = await axiosConfig.post(`${lastURL}`, {
      userId,
      pinId,
      comment,
    });

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
