import { createAsyncThunk } from "@reduxjs/toolkit";
import { contactsApi } from "../../config/contactsApi";
import { showToastError, showToastSuccess } from "../../utils/showToast";
import { MESSAGES } from "../../constants/toastMessages";

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
