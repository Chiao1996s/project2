import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './features/contactSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer
  }
});