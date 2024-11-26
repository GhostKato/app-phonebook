import { createAsyncThunk } from "@reduxjs/toolkit";
import { contactsApi, setToken, clearToken } from "../../config/contactsApi";

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkApi) => {
    try {
            
      await contactsApi.post('/auth/register', credentials);     
      
      const { email, password } = credentials;
      
      const loginResponse = await contactsApi.post('/auth/login', { email, password });
      setToken(loginResponse.data.data.accessToken);      
      return loginResponse.data.data;      
      } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);


export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await contactsApi.post('auth/login', credentials);
      setToken(data.data.accessToken);      
      return data.data;
    } catch (err) {      
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await contactsApi.post('auth/logout');
    clearToken();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const savedToken = thunkAPI.getState().auth.token;    
    if (savedToken === null) {
      return thunkAPI.rejectWithValue('Token is not exist!');
    }    
    try {
      setToken(savedToken);
      const { data } = await contactsApi.post('auth/refresh');      
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
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
