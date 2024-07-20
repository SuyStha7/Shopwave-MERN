import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartService from "./cartService.js";

// Load cart state from local storage
const loadStateFromLocalStorage = () => {
  try {
    const cartData = window.localStorage.getItem("cart");
    if (cartData === null) {
      return {
        items: [],
      };
    }
    return JSON.parse(cartData);
  } catch (error) {
    console.log("Error while loading cart items", error);
    return {
      items: [],
    };
  }
};

// Save cart state to local storage
const saveStateIntoLocalStorage = (state) => {
  try {
    const cartData = JSON.stringify(state);
    window.localStorage.setItem("cart", cartData);
  } catch (error) {
    console.log("Error while saving cart items to local storage", error);
  }
};

const initialState = loadStateFromLocalStorage();

export const saveCart = createAsyncThunk(
  "cart/saveCart",
  async ({ userId, cartItems }, thunkAPI) => {
    try {
      const response = await cartService.saveCart(cartItems, userId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error saving cart items"
      );
    }
  }
);

export const loadCart = createAsyncThunk(
  "cart/loadCart",
  async (_, thunkAPI) => {
    const { user } = thunkAPI.getState().auth;
    try {
      const response = await cartService.loadCart(user._id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error loading cart items"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    ...initialState,
    status: "idle",
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(
        (i) => i.productId === item.productId
      );

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
      saveStateIntoLocalStorage(state);
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.productId !== itemId);
      saveStateIntoLocalStorage(state);
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === productId
      );
      if (existingItem) {
        existingItem.quantity = quantity;
      }
      saveStateIntoLocalStorage(state);
    },
    clearCart: (state) => {
      state.items = [];
      saveStateIntoLocalStorage(state);
    },
  },
  extraReducers: (builder) => {
    builder
      // save cart
      .addCase(saveCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(saveCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(saveCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // load cart
      .addCase(loadCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(loadCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
