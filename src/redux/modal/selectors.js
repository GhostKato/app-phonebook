export const selectModalState = (state, contactId, modalType) => {
  const id = contactId === null ? modalType : contactId;  
  return state.modals[id] ? state.modals[id][modalType] : false;  
};

export const selectUpdateContact = (state, contactId) => selectModalState(state, contactId, 'updateContact');
export const selectSendMessage = (state, contactId) => selectModalState(state, contactId, 'sendMessage');

export const selectAddContact = (state) => selectModalState(state, null, 'addContact');  
export const selectUpdateUser = (state) => selectModalState(state, null, 'updateUser');
export const selectMenuUser = (state) => selectModalState(state, null, 'menuUser');   
