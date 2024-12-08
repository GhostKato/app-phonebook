import { createAsyncThunk } from '@reduxjs/toolkit';
import { contactsApi } from '../../config/contactsApi';
import { MESSAGES } from '../../constants/toastMessages';
import { showToastSuccess } from '../../utils/showToast';
import { showToastError } from '../../utils/showToast';


export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async (_, thunkAPI) => {
  try {
    const { data } = await contactsApi.get('contacts');
    showToastSuccess(MESSAGES.FETCH_CONTACTS.SUCCESS);
    return data;
  } catch (error) {
    showToastError(MESSAGES.FETCH_CONTACTS.ERROR);
    return thunkAPI.rejectWithValue(error.message);
  }
});


export const addContacts = createAsyncThunk('contacts/addContact', async (body, thunkAPI) => {
  try {
    const { data } = await contactsApi.post('contacts', body);
    showToastSuccess(MESSAGES.ADD_CONTACTS.SUCCESS);
    return data;
  } catch (error) {
    showToastError(MESSAGES.ADD_CONTACTS.ERROR);
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
    showToastSuccess(MESSAGES.UPDATE_CONTACTS.SUCCESS);
    return data;
  } catch (error) {
    showToastError(MESSAGES.UPDATE_CONTACTS.ERROR);
    return thunkAPI.rejectWithValue(error.message);
  }
});


export const deleteContacts = createAsyncThunk('contacts/deleteContact', async (id, thunkAPI) => {
  try {
    await contactsApi.delete(`contacts/${id}`);
    showToastSuccess(MESSAGES.DELETE_CONTACTS.SUCCESS);
    return id;
  } catch (error) {
    showToastError(MESSAGES.DELETE_CONTACTS.ERROR);
    return thunkAPI.rejectWithValue(error.message);
  }
});


export const fetchFavourite = createAsyncThunk('contacts/fetchFavourite', async (_, thunkAPI) => {
  try {
    const { data } = await contactsApi.get('contacts?isFavourite=true');
    showToastSuccess(MESSAGES.FETCH_FAVOURITE.SUCCESS);
    return data;
  } catch (error) {
    showToastError(MESSAGES.FETCH_FAVOURITE.ERROR);
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
    showToastSuccess(MESSAGES.CHANGE_FAVOURITE.SUCCESS);
    return data;
  } catch (error) {
    showToastError(MESSAGES.CHANGE_FAVOURITE.ERROR);
    return thunkAPI.rejectWithValue(error.message);
  }
});
