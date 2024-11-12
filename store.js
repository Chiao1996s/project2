import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './features/todoSlice';
import groupReducer from './features/groupSlice';

const store = configureStore({
  reducer: {
    todos: todoReducer,
    groups: groupReducer,
  },
});

export default store;
