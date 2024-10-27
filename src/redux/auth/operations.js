import { createAsyncThunk } from '@reduxjs/toolkit';
import { contactsApi } from "../../config/contactsApi";

export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await contactsApi.post('/auth/register', { name, email, password });
      console.log('Registration successful:', data);     
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/logIn',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await contactsApi.post('/auth/login', { email, password }, { withCredentials: true });
      console.log('Login successful:', response.data);      
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

export const logOut = createAsyncThunk(
  'auth/logOut',
  async (_, { rejectWithValue }) => {
    try {
      await contactsApi.post('/auth/logout');
     
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (refreshToken, { rejectWithValue }) => {
    try {
      const response = await contactsApi.post('/auth/refresh-token', { token: refreshToken });    
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Unable to refresh token');
    }
  }
);
