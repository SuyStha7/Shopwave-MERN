import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const createProduct = async (inputValues) => {
  try {
    const axiosResponse = await axios.post(
      `${baseURL}/products/addProduct`,
      inputValues,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );
    return axiosResponse.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again.";
    return Promise.reject(errorMessage);
  }
};

const getAllProduct = async () => {
  try {
    const axiosResponse = await axios.get(`${baseURL}/products/getProduct`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return axiosResponse.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again.";
    return Promise.reject(errorMessage);
  }
};

const getSingleProduct = async (productId) => {
  try {
    const axiosResponse = await axios.get(
      `${baseURL}/products/getSingleProduct/${productId}`,
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
      "Something went wrong. Please try again.";
    return Promise.reject(errorMessage);
  }
};

const updateProduct = async ({ inputValues, productId }) => {
  try {
    const axiosResponse = await axios.put(
      `${baseURL}/products/updateProduct/${productId}`,
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
      "Something went wrong. Please try again.";
    return Promise.reject(errorMessage);
  }
};

const deleteProduct = async (productId) => {
  try {
    const axiosResponse = await axios.delete(
      `${baseURL}/products/delProduct/${productId}`,
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
      "Something went wrong. Please try again.";
    return Promise.reject(errorMessage);
  }
};

const searchProduct = async (query) => {
  try {
    const axiosResponse = await axios.get(
      `${baseURL}/products/searchProduct?q=${query}`,
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
      "Something went wrong. Please try again.";
    return Promise.reject(errorMessage);
  }
};

const productService = {
  createProduct,
  getAllProduct,
  deleteProduct,
  getSingleProduct,
  updateProduct,
  searchProduct,
};

export default productService;
