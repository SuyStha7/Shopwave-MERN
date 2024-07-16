import axios from "axios";

const createCat = async (inputValues) => {
  try {
    const axiosResponse = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/categories/addCategory`,
      inputValues,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return axiosResponse.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong Please try again";
    return Promise.reject(errorMessage);
  }
};

const getAllCat = async () => {
  try {
    const axiosResponse = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/categories/getCategory`,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return axiosResponse.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong Please try again";
    return Promise.reject(errorMessage);
  }
};

const getSingleCat = async (slug) => {
  try {
    const axiosResponse = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/categories/getSingleCategory/${slug}`,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return axiosResponse.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong Please try again";
    return Promise.reject(errorMessage);
  }
};

const updateCat = async ({ name, slug }) => {
  try {
    const axiosResponse = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/categories/updateCategory/${slug}`,
      { name },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return axiosResponse.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong Please try again";
    return Promise.reject(errorMessage);
  }
};

const deleteCat = async (slug) => {
  try {
    const axiosResponse = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/categories/delCategory/${slug}`,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return axiosResponse.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong Please try again";
    return Promise.reject(errorMessage);
  }
};

const categoriesService = {
  createCat,
  getAllCat,
  deleteCat,
  getSingleCat,
  updateCat,
};

export default categoriesService;
