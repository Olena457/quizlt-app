import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ref,
  get,
  set,
  query,
  orderByKey,
  startAfter,
  limitToFirst,
} from 'firebase/database';
import { auth, database } from '../../firebase/firebaseConfig.js';

// __________________fetch cards
export const fetchCards = createAsyncThunk(
  'cards/fetchCards',
  async (_, thunkAPI) => {
    try {
      const cardsRef = ref(database, 'cards');
      const snapshot = await get(cardsRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (typeof data === 'object' && data !== null) {
          const cardsArray = Object.keys(data).map(id => ({
            id,
            ...data[id],
          }));
          return cardsArray;
        } else {
          return thunkAPI.rejectWithValue('Data format is not correct');
        }
      } else {
        return thunkAPI.rejectWithValue('No data available');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// __________________register participant

export const registerParticipant = createAsyncThunk(
  'cards/participants',
  async ({ fullname, email, phoneNumber, question, cardID }, thunkAPI) => {
    try {
      const user = auth.currentUser;
      const uid = user.uid;

      const contactRef = ref(database, `participants/${cardID}/${uid}`);

      await set(contactRef, {
        fullname,
        email,
        phoneNumber,
        cardID,
        question,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// __________________fetch cards with pagination

export const fetchCardsPaginated = createAsyncThunk(
  'cards/fetchCardsPaginated',
  async ({ lastKey = null }, thunkAPI) => {
    try {
      const cardsRef = ref(database, 'cards');

      const cardsQuery = lastKey
        ? query(cardsRef, orderByKey(), startAfter(lastKey), limitToFirst(4))
        : query(cardsRef, orderByKey(), limitToFirst(4));

      const snapshot = await get(cardsQuery);

      if (snapshot.exists()) {
        const data = snapshot.val();

        const cardsArray = Object.keys(data).map(id => ({
          id,
          ...data[id],
        }));

        const result = {
          cards: cardsArray,
          lastKey: cardsArray[cardsArray.length - 1]?.id || null,
        };

        return result;
      } else {
        return thunkAPI.rejectWithValue('No data available');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
