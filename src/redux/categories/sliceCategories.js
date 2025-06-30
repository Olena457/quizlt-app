import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllCategoriesData,
  fetchQuizzesByCategory,
} from './operationsCategories.js';

const initialState = {
  allCategories: [],
  selectedCategoryData: null, // (title, description)
  selectedCategoryQuestions: [], // quizz questions for the selected category
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearSelectedCategoryQuestions(state) {
      state.selectedCategoryQuestions = [];
      state.selectedCategoryData = null;
    },
  },
  extraReducers: builder => {
    builder
      // fetchAllCategoriesData (CategoryPage)
      .addCase(fetchAllCategoriesData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCategoriesData.fulfilled, (state, action) => {
        state.loading = false;
        state.allCategories = action.payload;
      })
      .addCase(fetchAllCategoriesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Обробка fetchQuizzesByCategory
      .addCase(fetchQuizzesByCategory.pending, state => {
        state.loading = true;
        state.error = null;
        state.selectedCategoryQuestions = [];
        state.selectedCategoryData = null;
      })
      .addCase(fetchQuizzesByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCategoryQuestions = action.payload.data;
        state.selectedCategoryData = action.payload.metaData;
      })
      .addCase(fetchQuizzesByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedCategoryQuestions } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;
