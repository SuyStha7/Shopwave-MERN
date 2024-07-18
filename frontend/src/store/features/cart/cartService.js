import axios from "axios";

const saveCart = async (cartItems, userId) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/cart/${userId}`,
      { cartItems },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong! Please try again";
    return Promise.reject(errorMessage);
  }
};

const loadCart = async (userId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/cart/${userId}`,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong! Please try again";
    return Promise.reject(errorMessage);
  }
};

const cartService = {
  saveCart,
  loadCart,
};

export default cartService;
