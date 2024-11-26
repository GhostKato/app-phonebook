import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { register, logIn, logOut, refreshUser, sendResetEmail, resetPassword } from "./operations";

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  message: '',
  error: '',
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = '';
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {        
        state.token = action.payload.accessToken; 
        state.user.name = action.payload.user.name;            
      })
      .addCase(logIn.fulfilled, (state, action) => { 
        state.token = action.payload.accessToken; 
        state.user.name = action.payload.user.name;        
      })
      .addCase(logOut.fulfilled, () => {
        return initialState;
      })
        .addCase(refreshUser.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;        
        state.isRefreshing = false;
        
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      })
      .addCase(sendResetEmail.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(sendResetEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || 'Letter sent successfully!';
      })
      .addCase(sendResetEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || 'Password successfully reset!';
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addMatcher(isAnyOf(register.fulfilled, logIn.fulfilled, refreshUser.fulfilled), state => {
      state.isLoggedIn = true;      
    })
  },
});

export const { clearMessage } = authSlice.actions;
export const authReducer = authSlice.reducer;