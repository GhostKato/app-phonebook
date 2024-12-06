import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addContacts, deleteContacts, fetchContacts, updateContact } from './operations.js';
import { logOut } from '../auth/operations.js';

const initialState = {
  items: [],
  isLoading: false,
  isError: false,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload.data.data || [];        
      })       
      .addCase(addContacts.fulfilled, (state, action) => {
        state.items.push(action.payload.data);
      })      
      .addCase(updateContact.fulfilled, (state, action) => {       
        const index = state.items.findIndex(contact => contact._id === action.payload.data.contact._id);
        if (index !== -1) {
          state.items[index] = action.payload.data.contact;
        }
      })      
      .addCase(deleteContacts.fulfilled, (state, action) => {
        state.items = state.items.filter(contact => contact._id !== action.payload);                
      })   
      .addCase(logOut.fulfilled, () => {
        return initialState;
      })
    .addMatcher(isAnyOf(fetchContacts.pending, deleteContacts.pending, addContacts.pending, updateContact.pending), state => {
      state.isLoading = true;
      state.isError = false;
    })
    .addMatcher(isAnyOf(fetchContacts.rejected, deleteContacts.rejected, addContacts.rejected, updateContact.rejected), state => {
      state.isLoading = false;
      state.isError = true;
    })
    .addMatcher(isAnyOf(fetchContacts.fulfilled, deleteContacts.fulfilled, addContacts.fulfilled, updateContact.fulfilled), state => {
      state.isLoading = false;
      state.isError = false;
    })
  },
});

export const contactsReducer = contactsSlice.reducer;






