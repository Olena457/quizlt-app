import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, push, get, set, remove, update } from 'firebase/database';
import { database } from '../../firebase/firebaseConfig';
import { selectUserId } from '../auth/selectorsAuth';

export const addCustomCard = createAsyncThunk(
  'customCards/add',
  async ({ category, question, options, correctAnswer }, thunkAPI) => {
    try {
      const userId = selectUserId(thunkAPI.getState());
      if (!userId) {
        throw new Error('User is not authenticated.');
      }

      //  customCards/{categoryName}/{_ID_question}
      const cardsRef = ref(database, `customCards/${category}`);
      const newRef = push(cardsRef);

      const dataToSave = {
        question,
        options,
        correctAnswer,
        createdBy: userId,
        // createdAt: new Date().toISOString(), //  ISO fomat date
      };

      await set(newRef, dataToSave);
      return { id: newRef.key, category, ...dataToSave };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editCustomCard = createAsyncThunk(
  'customCards/edit',
  async ({ category, id, updatedCard }, thunkAPI) => {
    try {
      const refToCard = ref(database, `customCards/${category}/${id}`);
      // updatedCard { question, options, correctAnswer, createdBy }
      await update(refToCard, updatedCard);
      return { category, id, ...updatedCard };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteCustomCard = createAsyncThunk(
  'customCards/delete',
  async ({ category, id }, thunkAPI) => {
    try {
      const refToCard = ref(database, `customCards/${category}/${id}`);
      await remove(refToCard);
      return { category, id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCustomCardsByCategory = createAsyncThunk(
  'customCards/fetchByCategory',
  async (category, thunkAPI) => {
    try {
      const refToCards = ref(database, `customCards/${category}`);
      const snapshot = await get(refToCards);
      if (snapshot.exists()) {
        const cards = Object.entries(snapshot.val()).map(([id, data]) => ({
          id,
          ...data,
        }));
        return { category, cards };
      } else {
        return { category, cards: [] };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCustomCardById = createAsyncThunk(
  'customCards/fetchById',
  async ({ category, id }, thunkAPI) => {
    try {
      const cardRef = ref(database, `customCards/${category}/${id}`);
      const snapshot = await get(cardRef);
      if (snapshot.exists()) {
        return { id: snapshot.key, category, ...snapshot.val() };
      } else {
        return thunkAPI.rejectWithValue('Custom card not found');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
