import { createSlice } from "@reduxjs/toolkit";

const loadWishlistStateFromLocalStorage = () => {
  try {
    const wishlistData = window.localStorage.getItem("wishlist");
    if (wishlistData === null) {
      return {
        items: [],
      };
    }

    return JSON.parse(wishlistData);
  } catch (error) {
    console.log("Error while loading wishlist items", error);
    return {
      items: [],
    };
  }
};

const saveWishlistStateIntoLocalStorage = (state) => {
  try {
    const wishlistData = JSON.stringify(state);
    window.localStorage.setItem("wishlist", wishlistData);
  } catch (error) {
    console.log("Error while saving wishlist items to local storage", error);
  }
};

const initialState = loadWishlistStateFromLocalStorage();

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(
        (i) => i.productId === item.productId
      );

      if (!existingItem) {
        state.items.push(item);
      }
      saveWishlistStateIntoLocalStorage(state);
    },

    removeFromWishlist: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.productId !== itemId);
      saveWishlistStateIntoLocalStorage(state);
    },

    clearWishlist: (state) => {
      state.items = [];
      saveWishlistStateIntoLocalStorage(state);
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
