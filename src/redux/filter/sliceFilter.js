import { createSlice } from '@reduxjs/toolkit';

const sliceFilter = createSlice({
  name: 'filter',
  initialState: {
    filter: 'All',
    error: null,
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setFilter, setError } = sliceFilter.actions;

export default sliceFilter.reducer;
