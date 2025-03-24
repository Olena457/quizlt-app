import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, get } from 'firebase/database';
import { database } from '../../firebase/firebaseConfig.js';

export const fetchPlayers = createAsyncThunk(
  'players/fetchPlayers',
  async (cardId, thunkAPI) => {
    try {
      const playersRef = ref(database, `players/${cardId}`);
      const snapshot = await get(playersRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        return {
          cardId,
          players: Object.values(data),
        };
      } else {
        return thunkAPI.rejectWithValue('No found players answers');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
