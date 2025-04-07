import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  isSeller: false,
  seller: null,
  error: null
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadSellerRequest", (state) => {
      state.isLoading = true;
      state.isSeller = false;
      state.seller = null;
      state.error = null;
    })
    .addCase("LoadSellerSuccess", (state, action) => {
      state.isLoading = false;
      state.isSeller = true;
      state.seller = action.payload;
      state.error = null;
    })
    .addCase("LoadSellerFail", (state, action) => {
      state.isLoading = false;
      state.isSeller = false;
      state.seller = null;
      state.error = action.payload;
    })
    .addCase("clearSellerError", (state) => {
      state.error = null;
    })
    .addCase("logoutSellerRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("logoutSellerSuccess", (state) => {
      state.isLoading = false;
      state.isSeller = false;
      state.seller = null;
    })
    .addCase("logoutSellerFail", (state) => {
      state.isLoading = false;
    })
    .addCase("getAllSellersRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllSellersSuccess", (state, action) => {
      state.isLoading = false;
      state.sellers = action.payload || [];
      state.error = null;
    })
    .addCase("getAllSellerFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
