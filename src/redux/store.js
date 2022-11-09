import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer, filterReducer, authReducer } from './contactsSlice';
export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
    auth: authReducer,
  },
});
