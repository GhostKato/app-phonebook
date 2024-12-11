import { createAsyncThunk } from "@reduxjs/toolkit";
import { contactsApi, setToken, clearToken, getToken } from "../../config/contactsApi";
import { MESSAGES } from '../../constants/toastMessages';
import { showToastSuccess } from '../../utils/showToast';
import { showToastError } from '../../utils/showToast';


export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkApi) => {
    try {
      await contactsApi.post('/auth/register', credentials);    
      const { email, password } = credentials;      
      try {
        const loginResponse = await contactsApi.post('/auth/login', { email, password });
        setToken(loginResponse.data.data.accessToken);      
        showToastSuccess(MESSAGES.LOGIN.SUCCESS);
        return loginResponse.data.data;
      } catch (loginError) {        
        showToastError(MESSAGES.LOGIN.ERROR);
        return thunkApi.rejectWithValue(loginError.message);
      }
    } catch (err) {      
      showToastError(MESSAGES.REGISTER.ERROR);
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
      showToastSuccess(MESSAGES.LOGIN.SUCCESS);
      console.log(`дата`, data.data);
      return data.data;
    } catch (err) {
      showToastError(MESSAGES.LOGIN.ERROR);
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
    const savedToken = getToken();    
    if (!savedToken) {
      return thunkAPI.rejectWithValue('Token is not exist!');
    }    
    try {        
      const { data } = await contactsApi.post('auth/refresh');      
      setToken(data.data.accessToken);      
      return data.data;      
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
      showToastSuccess(MESSAGES.SEND_RESET_EMAIL.SUCCESS);
      return response.data;
    } catch (error) {
      showToastError(MESSAGES.SEND_RESET_EMAIL.ERROR);
      return rejectWithValue(error.response?.data?.message || 'Unable to send a password reset email');
    }
  }
);


export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await contactsApi.post('/auth/reset-pwd', { token, password });
      showToastSuccess(MESSAGES.RESET_PASSWORD.SUCCESS);
      return response.data;
    } catch (error) {
      showToastError(MESSAGES.RESET_PASSWORD.ERROR);
      return rejectWithValue(error.response?.data?.message || 'Could not reset password');
    }
  }
);


export const getGoogleAuthUrl = async () => {
  try {
    // Використовуємо contactsApi для запиту
    const res = await contactsApi.get('/auth/get-oauth-url');
    
    if (res.status !== 200) {
      throw new Error('Unable to get authorization URL');
    }

    console.log('Google Auth URL:', res.data.data.url);
    return res.data.data.url;  // Повертаємо отриманий URL
  } catch (error) {
    console.error('Error getting Google Auth URL:', error);
    throw error;  // Викидаємо помилку для подальшої обробки
  }
};


export const exchangeAuthCodeForToken = async (code) => {
  try {
    // Відправляємо код на сервер
    const res = await contactsApi.post('/auth/confirm-oauth', {
      code,  // Параметр просто передаємо як об'єкт
    });

    // Перевіряємо статус відповіді
    if (res.status !== 200) {
      throw new Error('Error exchanging code for token');
    }

    // Повертаємо дані з відповіді
    return res.data;
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    throw new Error('Error sending code to server');
  }
};
