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
        const categoryData = snapshot.val();
        const allPlayersResults = [];

        for (const userId in categoryData) {
          const playerData = categoryData[userId];
          if (typeof playerData === 'object' && playerData !== null) {
            allPlayersResults.push({
              ...playerData,
              userId: userId,
            });
          }
        }

        return {
          category: categoryName,
          players: allPlayersResults,
        };
      } else {
        return {
          category: categoryName,
          players: [],
        };
      }
    } catch (error) {
      console.error('Error fetching players:', error);
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

      const playerResultRef = ref(database, `players/${category}/${userId}`);

      const playerData = {
        userName: currentUser?.displayName || currentUser?.name || 'Anonymous',
        score: correctAnswersCount,
        timeTaken: timeTaken,
        totalQuestions: totalQuestions,
        category,
        playedAt: new Date().toISOString(),
      };

      await set(playerResultRef, playerData);

      return {
        category: category,
        userId: userId,
        playerData: { ...playerData, userId: userId },
      };
    } catch (error) {
      console.error('Error registering game participant:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
