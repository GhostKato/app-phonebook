import { createAsyncThunk } from '@reduxjs/toolkit';
import { contactsApi, setToken, clearToken } from "../../config/contactsApi";

 let token = "";

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await contactsApi.post('/auth/register', credentials);          
      return data;
    } catch (err) {
      return thunkAPI(err.response?.data?.message || 'Registration failed');
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/logIn',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await contactsApi.post('/auth/login', {
          email: credentials.email,
          password: credentials.password,
        },
        
        { withCredentials: true });
      
      token = data.accessToken;
      setToken(token);
      return data;
    } catch (error) {
      return thunkAPI(error.response?.data?.message || 'Login failed');
    }
  }
);

export const logOut = createAsyncThunk(
  'auth/logOut',
  async (_, thunkAPI) => {
    try {
      await contactsApi.post('/auth/logout', null, {
      withCredentials: true
      });
      
      clearToken();
     
    } catch (error) {
      return thunkAPI(error.response?.data?.message || 'Logout failed');
    }
  }
);

export const refresh = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }
    try {
      setToken(persistedToken);
      const res = await contactsApi.post('/auth/refresh-token', null, {
        withCredentials: true,
      });    
      
      return res.data;
    } catch (error) {
      return thunkAPI(error.response?.data?.message || 'Unable to refresh token');
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


