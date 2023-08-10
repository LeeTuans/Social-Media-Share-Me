import axiosConfig from "../../config/axiosConfig";

const lastURL = "/saved";

export const getSaveByUser = async (id) => {
  try {
    const response = await axiosConfig.get(`${lastURL}/${id}`);

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createSave = async (data) => {
  try {
    const response = await axiosConfig.post(`${lastURL}`, data);

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateSave = async (data) => {
  try {
    const response = await axiosConfig.post(`${lastURL}`, data);

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteSave = async (Save) => {
  try {
    const response = await axiosConfig.post(`${lastURL}`, Save);

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
