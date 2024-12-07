import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addContacts, deleteContacts, fetchContacts, fetchFavourite, updateContact, changeFavourite } from './operations.js';
import { logOut } from '../auth/operations.js';

const initialState = {
  contacts: [],
  favourite: [],
  isLoading: false,
  isError: false,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload.data.data || [];        
      })       
      .addCase(addContacts.fulfilled, (state, action) => {
        state.contacts.push(action.payload.data);
      })      
      .addCase(updateContact.fulfilled, (state, action) => {       
        const index = state.contacts.findIndex(contact => contact._id === action.payload.data.contact._id);
        if (index !== -1) {
          state.contacts[index] = action.payload.data.contact;
        }
      })      
      .addCase(deleteContacts.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(contact => contact._id !== action.payload);                
      })   
      .addCase(fetchFavourite.fulfilled, (state, action) => {
        state.favourite = action.payload.data.data || [];        
      })     
      .addCase(logOut.fulfilled, () => {
        return initialState;
      })
      .addCase(changeFavourite.fulfilled, (state, action) => {
        const { _id, isFavourite } = action.payload.data.contact;
        
        if (isFavourite) {
          const contact = state.contacts.find(contact => contact._id === _id);
          if (contact) {
            state.favourite.push(contact);
          }
        } else {
          state.favourite = state.favourite.filter(contact => contact._id !== _id);
        }
      })
    .addMatcher(isAnyOf(fetchContacts.pending, deleteContacts.pending, addContacts.pending, updateContact.pending, fetchFavourite.pending, changeFavourite.pending), state => {
      state.isLoading = true;
      state.isError = false;
    })
    .addMatcher(isAnyOf(fetchContacts.rejected, deleteContacts.rejected, addContacts.rejected, updateContact.rejected, fetchFavourite.rejected, changeFavourite.rejected), state => {
      state.isLoading = false;
      state.isError = true;
    })
    .addMatcher(isAnyOf(fetchContacts.fulfilled, deleteContacts.fulfilled, addContacts.fulfilled, updateContact.fulfilled, fetchFavourite.fulfilled, changeFavourite.fulfilled), state => {
      state.isLoading = false;
      state.isError = false;
    })
  },
});

export const contactsReducer = contactsSlice.reducer;
