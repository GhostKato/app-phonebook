import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://nodejs-hw-mongodb-nls0.onrender.com/auth';

export const sendResetEmail = createAsyncThunk(
  'auth/sendResetEmail',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post('/send-reset-email', { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Unable to send a password reset email');
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/reset-pwd', { token, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Could not reset password');
    }
  }
);
