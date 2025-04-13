import { createSlice } from "@reduxjs/toolkit";

// Get initial state from localStorage if available
const getInitialState = () => {
  const storedUser = localStorage.getItem('user');
  return {
    isAuthenticated: !!storedUser,
    user: storedUser ? JSON.parse(storedUser) : null,
    loading: false,
    error: null,
  };
};

const userSlice = createSlice({
  name: "user",
  initialState: getInitialState(),
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
      // Clear user from localStorage
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFail, logout, clearError } = userSlice.actions;
export default userSlice.reducer; 