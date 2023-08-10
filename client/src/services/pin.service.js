import axiosConfig from "../../config/axiosConfig";

const lastURL = "/pins";

export const getPins = async (pinId = "") => {
  try {
    const response = await axiosConfig.get(`${lastURL}/${pinId}`);

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPinsByUser = async (userId, type = "Created") => {
  try {
    const response = await axiosConfig.get(
      `${lastURL}/filter?userId=${userId}&type=${type}`
    );

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const filterPins = async ({ categoryId = "", search = "" }) => {
  try {
    const response = await axiosConfig.get(
      `${lastURL}/filter?categoryId=${categoryId}&search=${search}`
    );

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createPin = async (Pin) => {
  try {
    const response = await axiosConfig.post(`${lastURL}`, Pin, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deletePinService = async (id) => {
  try {
    const response = await axiosConfig.delete(`${lastURL}/${id}`);

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
