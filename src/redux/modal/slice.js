import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal(state, action) {
      const { contactId, modalType } = action.payload;
      state[contactId] = { ...state[contactId], [modalType]: true };
    },
    closeModal(state, action) {
      const { contactId, modalType } = action.payload;
      if (state[contactId]) {
        state[contactId] = { ...state[contactId], [modalType]: false };
      }
    },
    toggleModal(state, action) {
      const { contactId, modalType } = action.payload;
      if (state[contactId]) {
        state[contactId] = { ...state[contactId], [modalType]: !state[contactId][modalType] };
      }
    },
  },
});

export const { openModal, closeModal, toggleModal } = modalsSlice.actions;

export default modalsSlice.reducer;