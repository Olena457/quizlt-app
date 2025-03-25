import { createSlice } from '@reduxjs/toolkit';

const sliceFilter = createSlice({
  name: 'filter',
  initialState: {
    selectedCategory: 'All',
    error: null,
  },
  reducers: {
    setCategoryFilter: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setCategoryFilter } = sliceFilter.actions;
export default sliceFilter.reducer;
