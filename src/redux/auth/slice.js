import { createSlice } from '@reduxjs/toolkit';
import { sendResetEmail, resetPassword } from './operations';

const authSlice = createSlice({
  name: 'auth',
  initialState: { message: '', error: '', loading: false },
  reducers: {
    clearMessage: (state) => {
      state.message = '';
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const { clearMessage } = authSlice.actions;
export default authSlice.reducer;
