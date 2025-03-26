import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, get, set } from 'firebase/database';
import { database } from '../../firebase/firebaseConfig';
import { selectUser } from '../../redux/auth/selectorsAuth';

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
        return thunkAPI.rejectWithValue('No players found for this card');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const registerGameParticipant = createAsyncThunk(
  'players/registerGameParticipant',
  async ({ cardId, userId }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const currentUser = selectUser(state);

      if (!currentUser?.uid) {
        return thunkAPI.rejectWithValue('User not authenticated');
      }

      const playersRef = ref(database, `players/${cardId}/${userId}`);
      const snapshot = await get(playersRef);

      if (snapshot.exists()) {
        return { playerId: userId, cardId, playerData: snapshot.val() };
      } else {
        const playerData = {
          fullname: currentUser?.displayName || '',
          email: currentUser?.email || '',
          score: 0,
          amount: 0,
          userId: currentUser.uid,
        };
        await set(playersRef, playerData);
        return { playerId: userId, cardId, playerData };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
