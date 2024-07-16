import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoriesService from "./categoriesService.js";

// use this function in Categories
export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (inputValues, thunkAPI) => {
    try {
      const response = await categoriesService.createCat(inputValues);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// use this function in Categories
export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async (thunkAPI) => {
    try {
      const response = await categoriesService.getAllCat();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// use this function in UpadateCategory
export const getSingleCategory = createAsyncThunk(
  "categories/getSingleCategory",
  async (slug, thunkAPI) => {
    try {
      const response = await categoriesService.getSingleCat(slug);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// use this function in UpadateCategory
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ name, slug }, thunkAPI) => {
    try {
      const response = await categoriesService.updateCat({ name, slug });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// use this function in Categories
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (slug, thunkAPI) => {
    try {
      const response = await categoriesService.deleteCat(slug);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  categories: [],
  status: "idle",
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // add category
      .addCase(addCategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // get all category
      .addCase(getAllCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // get single category
      .addCase(getSingleCategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getSingleCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(getSingleCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // update category
      .addCase(updateCategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // delete category
      .addCase(deleteCategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default categoriesSlice.reducer;
