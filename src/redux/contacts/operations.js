import { createAsyncThunk } from '@reduxjs/toolkit';
import { contactsApi } from '../../config/contactsApi';


export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async (_, thunkAPI) => {
  try {
    const { data } = await contactsApi.get('contacts');    
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});


export const addContacts = createAsyncThunk('contacts/addContact', async (body, thunkAPI) => {
  try {
    const { data } = await contactsApi.post('contacts', body);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});


export const updateContact = createAsyncThunk('contacts/updateContact', async ({ id, body }, thunkAPI) => {
  try {
    
    const formData = new FormData();
    formData.append('name', body.name);
    formData.append('phoneNumber', body.phoneNumber);
    formData.append('contactType', body.contactType);
    formData.append('email', body.email);
    
    const { data } = await contactsApi.patch(`contacts/${id}`, formData, {
      headers: {         
        'Content-Type': 'multipart/form-data',
      },
    });    

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});


export const deleteContacts = createAsyncThunk('contacts/deleteContact', async (id, thunkAPI) => {
  try {
    await contactsApi.delete(`contacts/${id}`);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const fetchFavourite = createAsyncThunk('contacts/fetchFavourite', async (_, thunkAPI) => {
  try {
    const { data } = await contactsApi.get('contacts?isFavourite=true');    
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});


export const changeFavourite = createAsyncThunk('contacts/changeFavourite', async ({ id, body }, thunkAPI) => {
  try {
    
    const formData = new FormData();
    formData.append('isFavourite', body.isFavourite);    
    
    const { data } = await contactsApi.patch(`contacts/${id}`, formData, {
      headers: {         
        'Content-Type': 'multipart/form-data',
      },
    });    

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
