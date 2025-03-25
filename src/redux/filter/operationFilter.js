import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDatabase, ref, get } from 'firebase/database';
import { setCards } from './cardsSlice';

export const fetchCards = createAsyncThunk(
  'cards/fetchCards',
  async (_, thunkAPI) => {
    try {
      const database = getDatabase();
      const cardsRef = ref(database, 'cards');
      const snapshot = await get(cardsRef);

      if (snapshot.exists()) {
        const cards = [];
        snapshot.forEach(childSnapshot => {
          cards.push({ id: childSnapshot.key, ...childSnapshot.val() });
        });
        thunkAPI.dispatch(setCards(cards));
        return cards;
      }
      return [];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
