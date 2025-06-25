import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, push, get, set, remove, update } from 'firebase/database';
import { database } from '../../firebase/firebaseConfig';
import { selectUserId } from '../auth/selectorsAuth';

export const addCustomCard = createAsyncThunk(
  'customCards/add',
  async (newCard, thunkAPI) => {
    try {
      const userId = selectUserId(thunkAPI.getState());
      const cardRef = ref(database, `customCards/${newCard.category}`);
      const newRef = push(cardRef);
      const data = {
        ...newCard,
        creatorId: userId,
        createdAt: Date.now(),
      };
      await set(newRef, data);
      return { id: newRef.key, ...data };
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
