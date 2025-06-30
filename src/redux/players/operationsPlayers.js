import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, get, set } from 'firebase/database';
import { database } from '../../firebase/firebaseConfig';
import { selectUser } from '../../redux/auth/selectorsAuth';

export const fetchPlayers = createAsyncThunk(
  'players/fetchPlayers',
  async (categoryName, thunkAPI) => {
    try {
      const playersRef = ref(database, `players/${categoryName}`);
      const snapshot = await get(playersRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        return {
          category: categoryName,
          players: Object.values(data),
        };
      } else {
        return thunkAPI.rejectWithValue('No players found for this category');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const registerGameParticipant = createAsyncThunk(
  'players/registerGameParticipant',
  async (
    { category, userId, timeTaken, correctAnswersCount, totalQuestions },
    thunkAPI
  ) => {
    try {
      const state = thunkAPI.getState();
      const currentUser = selectUser(state);

      if (!currentUser?.uid) {
        return thunkAPI.rejectWithValue('User not authenticated');
      }

      //  players/{category}/{userId}
      const playerResultRef = ref(database, `players/${category}/${userId}`);

      const playerData = {
        fullname: currentUser?.displayName || 'Anonymous',
        // email: currentUser?.email || 'N/A',
        score: correctAnswersCount,
        timeTaken: timeTaken,
        totalQuestions: totalQuestions, //  total questions
        // playedAt: new Date().toISOString(),
        userId: currentUser.uid,
      };

      await set(playerResultRef, playerData); // save or udate player data

      return {
        category: category,
        userId: userId,
        playerData: playerData,
      };
    } catch (error) {
      console.error('Error registering game participant:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
