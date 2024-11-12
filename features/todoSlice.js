import { createSlice } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    value: [],
  },
  reducers: {
    addItem: (state, action) => {
      // Only add item if it's new
      const newItem = action.payload;
      if (!state.value.find(item => item.key === newItem.key)) {
        state.value.push(newItem);
      }
    },
    updateItem: (state, action) => {
      // Update item if it exists
      const updatedItem = action.payload;
      state.value = state.value.map(item =>
        item.key === updatedItem.key ? updatedItem : item
      );
    },
    deleteItem: (state, action) => {
      const itemId = action.payload.key;
      state.value = state.value.filter(item => item.key !== itemId);
    },
  },
});

export const { addItem, updateItem, deleteItem } = todoSlice.actions;
export default todoSlice.reducer;