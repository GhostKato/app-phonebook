export const selectModalState = (state, contactId, modalType) => {
  return state.modals[contactId] ? state.modals[contactId][modalType] : false;
};

export const selectUpdateContact = (state, contactId) => selectModalState(state, contactId, 'updateContact');
export const selectSendMessage = (state, contactId) => selectModalState(state, contactId, 'sendMessage');
export const selectAddContact = (state) => selectModalState(state, 'addContact');  // Якщо це глобальна модалка
export const selectUpdateUser = (state) => selectModalState(state, 'updateUser');  // Якщо це глобальна модалка
