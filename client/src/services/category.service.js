import axiosConfig from "../../config/axiosConfig";

const lastURL = "/categories";

export const getCategories = async () => {
  try {
    const response = await axiosConfig.get(`${lastURL}`);

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCategoryInfoById = async (id) => {
  try {
    const response = await axiosConfig.get(`${lastURL}/${id}`);

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createCategoryIfNotExist = async (category) => {
  try {
    const response = await axiosConfig.post(`${lastURL}`, category);

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
