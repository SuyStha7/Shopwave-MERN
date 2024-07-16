import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService.js"; // Adjust the path if needed

// Register thunk
export const register = createAsyncThunk(
  "auth/register",
  async (inputValues, thunkAPI) => {
    try {
      const response = await authService.registerUser(inputValues);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Login thunk
export const login = createAsyncThunk(
  "auth/login",
  async (inputValues, thunkAPI) => {
    try {
      const response = await authService.loginUser(inputValues);
      window.localStorage.setItem("user", JSON.stringify(response));
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Logout thunk
export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
  try {
    const response = await authService.logoutUser();
    window.localStorage.removeItem("user");
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getAllUsers = createAsyncThunk(
  "auth/getAllUsers",
  async (thunkAPI) => {
    try {
      const response = await authService.getAllUser();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const getUserDataFromLocalStorage = window.localStorage.getItem("user")
  ? JSON.parse(window.localStorage.getItem("user"))
  : null;

const initialState = {
  user: getUserDataFromLocalStorage,
  status: "idle",
  error: null,
};

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // register
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // login
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // logout
      .addCase(logout.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // all users
      .addCase(getAllUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
