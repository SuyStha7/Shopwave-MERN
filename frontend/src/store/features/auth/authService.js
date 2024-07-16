import axios from "axios";

const registerUser = async (inputValues) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      inputValues,
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

// Login User
const loginUser = async (inputValues) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      inputValues,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    window.localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong! Please try again";
    return Promise.reject(errorMessage);
  }
};

// Logout User
const logoutUser = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/users/logout`,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    window.localStorage.removeItem("user");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong! Please try again";
    return Promise.reject(errorMessage);
  }
};

// Get All Users
const getAllUser = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/users/all-users`,
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
      "Something went wrong Please try again";
    return Promise.reject(errorMessage);
  }
};

// Send Password Reset Email
const sendPasswordResetEmail = async (email) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/forgot-password`,
      { email },
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
      "Failed to send reset email.";
    return Promise.reject(errorMessage);
  }
};

const authService = {
  loginUser,
  registerUser,
  logoutUser,
  getAllUser,
  sendPasswordResetEmail,
};

export default authService;
