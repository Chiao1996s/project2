// groupSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const groupSlice = createSlice({
  name: 'groups',
  initialState: {
    value: [],
  },
  reducers: {
    addGroup: (state, action) => {
      console.log('Adding group:', action.payload); // Debugging line
      state.value.push(action.payload);
    },
    updateGroup: (state, action) => {
      const groupIndex = state.value.findIndex((group) => group.id === action.payload.id);
      if (groupIndex >= 0) {
        state.value[groupIndex] = action.payload;
      }
    },
    deleteGroup: (state, action) => {
      state.value = state.value.filter((group) => group.id !== action.payload.id);
    },
  },
});

export const { addGroup, updateGroup, deleteGroup } = groupSlice.actions;
export default groupSlice.reducer;
