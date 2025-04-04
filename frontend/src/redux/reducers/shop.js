import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  success: false,
  error: null,
  shop: null,
  sellers: [],
};

export const shopReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("createShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("createShopSuccess", (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.shop = action.payload;
    })
    .addCase("createShopFail", (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.error = action.payload;
    })
    .addCase("getAllSellersRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllSellersSuccess", (state, action) => {
      state.isLoading = false;
      state.sellers = action.payload;
    })
    .addCase("getAllSellersFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
}); 