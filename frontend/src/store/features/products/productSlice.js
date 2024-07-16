import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService.js";

// Async Thunks for API Calls
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (inputValues, thunkAPI) => {
    try {
      const response = await productService.createProduct(inputValues);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Return error message
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, thunkAPI) => {
    try {
      const response = await productService.getAllProduct();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Return error message
    }
  }
);

export const getSingleProduct = createAsyncThunk(
  "products/getSingleProduct",
  async (productId, thunkAPI) => {
    try {
      const response = await productService.getSingleProduct(productId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Return error message
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ inputValues, productId }, thunkAPI) => {
    try {
      const response = await productService.updateProduct({
        inputValues,
        productId,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Return error message
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId, thunkAPI) => {
    try {
      const response = await productService.deleteProduct(productId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Return error message
    }
  }
);

export const searchProduct = createAsyncThunk(
  "products/searchProduct",
  async (query, thunkAPI) => {
    try {
      const response = await productService.searchProduct(query);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Return error message
    }
  }
);

// Initial State
const initialState = {
  products: [],
  status: "idle", // idle, loading, succeeded, failed
  error: null,
};

// Slice Definition
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {}, // No additional reducers needed for now
  extraReducers: (builder) => {
    builder
      // Add Product
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload; // Assuming the payload is the updated products list
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // action.payload will contain the error message
      })

      // Get All Products
      .addCase(getAllProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload; // Assuming the payload is the products list
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // action.payload will contain the error message
      })

      // Get Single Product
      .addCase(getSingleProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload; // Assuming the payload is the single product
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // action.payload will contain the error message
      })

      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload; // Assuming the payload is the updated products list
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // action.payload will contain the error message
      })

      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload; // Assuming the payload is the updated products list
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // action.payload will contain the error message
      })

      // Search Product
      .addCase(searchProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload; // Assuming the payload is the search results
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // action.payload will contain the error message
      });
  },
});

export default productSlice.reducer;
