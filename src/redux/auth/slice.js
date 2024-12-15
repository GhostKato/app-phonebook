import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  register,
  logIn,
  logOut,
  refreshUser,
  sendResetEmail,
  resetPassword,
  exchangeAuthCodeForToken
} from "./operations";
import { updateUser } from "../user/operations";

const initialState = {
  user: {
    name: null,
    email: null,
    photo: null,
    id: null,
  },
  isLoggedIn: false,
  isRefreshing: false,
  isError: false,
  isLoading: false,
};

const updateUserData = (state, action) => {
  const { name, email, photo, _id: id } = action.payload.user || action.payload.data;
  state.user = { name, email, photo, id };
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, updateUserData)
      .addCase(logIn.fulfilled, updateUserData)
      .addCase(exchangeAuthCodeForToken.fulfilled, updateUserData)
      .addCase(updateUser.fulfilled, updateUserData)      
      
      .addCase(logOut.fulfilled, () => initialState)
      
      .addCase(refreshUser.fulfilled, (state, action) => {
        updateUserData(state, action);
        state.isRefreshing = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
        state.user = { name: null, email: null, photo: null, id: null };
      })
      
      .addCase(sendResetEmail.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(sendResetEmail.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(sendResetEmail.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })      
      
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      
      .addMatcher(isAnyOf(
        register.fulfilled,
        logIn.fulfilled,
        refreshUser.fulfilled,
        exchangeAuthCodeForToken.fulfilled
      ), (state) => {
        state.isLoggedIn = true;
      });
  },
});

export const authReducer = authSlice.reducer;
