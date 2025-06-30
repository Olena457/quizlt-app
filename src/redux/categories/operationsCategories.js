import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, get } from 'firebase/database';
import { database } from '../../firebase/firebaseConfig.js';

// __________________fetchAllCategoriesData
export const fetchAllCategoriesData = createAsyncThunk(
  'categories/fetchAllCategoriesData',
  async (_, thunkAPI) => {
    try {
      const categoriesRef = ref(database, 'categories');
      const snapshot = await get(categoriesRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const categoriesArray = Object.keys(data).map(categoryName => ({
          name: categoryName,
          title: data[categoryName].title,
          description: data[categoryName].description,
        }));
        return categoriesArray;
      } else {
        return thunkAPI.rejectWithValue('No categories available');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ___________________fetchQuizzesByCategory (замість fetchCardByCategory)
export const fetchQuizzesByCategory = createAsyncThunk(
  'categories/fetchQuizzesByCategory',
  async (categoryName, thunkAPI) => {
    try {
      const categoryRef = ref(database, `categories/${categoryName}`);
      const categorySnap = await get(categoryRef);

      let officialQuestions = [];
      let categoryMetaData = null;

      if (categorySnap.exists()) {
        const categoryData = categorySnap.val();
        const { quizzes, ...metaData } = categoryData;
        categoryMetaData = metaData;

        if (quizzes) {
          // 'card' замінено на 'question'
          officialQuestions = Object.entries(quizzes).map(([id, data]) => ({
            id,
            ...data,
          }));
        }
      }

      // 'customCards' 'customQuestions'
      const customRef = ref(database, `customCards/${categoryName}`);
      const customSnap = await get(customRef);
      const customQuestions = customSnap.exists()
        ? Object.entries(customSnap.val()).map(([id, data]) => ({
            id,
            isCustom: true,
            ...data,
          }))
        : [];

      const combined = [...officialQuestions, ...customQuestions];

      return {
        category: categoryName,
        metaData: categoryMetaData,
        data: combined,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
