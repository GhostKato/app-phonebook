import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { contactsReducer } from "./contacts/slice";
import { filterReducer } from "./filters/slice";
import modalsReducer from './modal/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contacts: contactsReducer,
    filters: filterReducer,
    modals: modalsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
      },
    }),
});
