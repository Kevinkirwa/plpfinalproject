import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  sellers: [],
  error: null,
};

export const sellersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("getAllSellersRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllSellersSuccess", (state, action) => {
      state.isLoading = false;
      state.sellers = action.payload;
      state.error = null;
    })
    .addCase("getAllSellersFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
}); 