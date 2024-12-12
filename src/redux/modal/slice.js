import { createSlice } from '@reduxjs/toolkit';

const initialState = {};  

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {    
    openModal(state, action) {
      const { contactId, modalType } = action.payload;      
      const id = contactId === null ? modalType : contactId;      
      state[id] = { ...state[id], [modalType]: true };
    },    
    closeModal(state, action) {
      const { contactId, modalType } = action.payload;
      const id = contactId === null ? modalType : contactId;      
      if (state[id]) {
        state[id] = { ...state[id], [modalType]: false };
      }
    },    
    toggleModal(state, action) {
      const { contactId, modalType } = action.payload;
      const id = contactId === null ? modalType : contactId;      
      if (state[id]) {
        state[id] = { ...state[id], [modalType]: !state[id][modalType] };
      } else {        
        state[id] = { [modalType]: true };
      }
    },
  },
});

export const { openModal, closeModal, toggleModal } = modalsSlice.actions;

export default modalsSlice.reducer;
