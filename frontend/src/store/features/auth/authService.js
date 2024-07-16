import axios from "axios";

// use this function in authSlice.js => createAsyncThunk
const registerUser = async (inputValues) => {
  try {
    const axiosResponse = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      inputValues,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, //axios send automatically cookies when we apply this property
      }
    );
    return axiosResponse.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong! Please try again";
    return Promise.reject(errorMessage);
  }
};

const loginUser = async (inputValues) => {
  try {
    const axiosResponse = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      inputValues,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, //axios send automatically cookies when we apply this property
      }
    );
    return axiosResponse.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong! Please try again";
    return Promise.reject(errorMessage);
  }
};

const logoutUser = async () => {
  try {
    const axiosResponse = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/users/logout`,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, //axios send automatically cookies when we apply this property
      }
    );
    return axiosResponse.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong! Please try again";
    return Promise.reject(errorMessage);
  }
};

const getAllUser = async () => {
  try {
    const axiosResponse = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/users/all-users`,
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

const authService = { loginUser, registerUser, logoutUser, getAllUser };

export default authService;
