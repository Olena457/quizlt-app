// import { createSlice } from '@reduxjs/toolkit';

// const sliceFilter = createSlice({
//   name: 'filter',
//   initialState: {
//     selectedCategory: 'All',
//     availableCategories: [],
//     error: null,
//   },
//   reducers: {
//     setCategoryFilter: (state, action) => {
//       state.selectedCategory = action.payload;
//     },
//     setAvailableCategories: (state, action) => {
//       state.availableCategories = action.payload;
//     },
//   },
// });

// export const { setCategoryFilter, setAvailableCategories } =
//   sliceFilter.actions;
// export default sliceFilter.reducer;

import { createSlice } from '@reduxjs/toolkit';

const sliceFilter = createSlice({
  name: 'filter',
  initialState: {
    selectedCategory: null,
    availableCategories: [],
    error: null,
  },
  reducers: {
    setCategoryFilter: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setAvailableCategories: (state, action) => {
      state.availableCategories = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCategoryFilter, setAvailableCategories } =
  sliceFilter.actions;
export default sliceFilter.reducer;
