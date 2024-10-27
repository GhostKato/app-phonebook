import { createAsyncThunk } from '@reduxjs/toolkit';
import { contactsApi } from "../../config/contactsApi";

export const register = createAsyncThunk(
    'auth/register',
    async (credentials, thunkApi) => {
        try {
            const { data } = await contactsApi.post('/auth/users/signup', credentials);            
            return data;
        } catch (err) {
            return thunkApi.rejectWithValue(err.message);
        }
    }
);

export const logIn = createAsyncThunk(
  'auth/logIn',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await contactsApi.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const sendResetEmail = createAsyncThunk(
  'auth/sendResetEmail',
  async (email, { rejectWithValue }) => {
    try {
      const response = await contactsApi.post('/auth/send-reset-email', { email });
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
      const response = await contactsApi.post('/auth/reset-pwd', { token, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Could not reset password');
    }
  }
);
