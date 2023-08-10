import axiosConfig from "../../config/axiosConfig";

export const getUsers = async () => {
  try {
    const response = await axiosConfig.get(`/users`);

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserInfoById = async (id) => {
  try {
    const response = await axiosConfig.get(`/users/${id}`);

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createUserIfNotExist = async (user) => {
  try {
    const response = await axiosConfig.post(`/users`, user);

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
