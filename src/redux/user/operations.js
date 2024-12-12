import { createAsyncThunk } from "@reduxjs/toolkit";
import { contactsApi } from "../../config/contactsApi";
import { showToastError, showToastSuccess } from "../../utils/showToast";
import { MESSAGES } from "../../constants/toastMessages";
import { createFormData } from "../../utils/formDataUtils";


export const updateUser = createAsyncThunk('user/updateUser', async ({ id, body }, thunkAPI) => {
  try {   
    const formData = createFormData(body);
    const { data } = await contactsApi.patch(`user/${id}`, formData, {
      headers: {         
        'Content-Type': 'multipart/form-data',
      },
    });    
    showToastSuccess(MESSAGES.UPDATE_USER.SUCCESS);
    return data;
  } catch (error) {
    showToastError(MESSAGES.UPDATE_USER.ERROR);
    return thunkAPI.rejectWithValue(error.message);
  }
});


export const sendMessage = createAsyncThunk('user/sendMessage', async (body, thunkAPI) => {
  try {     
       
     const res = await contactsApi.post('user/send-message', body, {
      
    });
    showToastSuccess(MESSAGES.SEND_MESSAGE.SUCCESS);
    return res.status;
  } catch (error) {
    showToastError(MESSAGES.SEND_MESSAGE.ERROR);
    return thunkAPI.rejectWithValue(error.message);
  }
});
