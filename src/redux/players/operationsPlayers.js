// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { ref, get } from 'firebase/database';
// import { database } from '../../firebase/firebaseConfig.js';

// export const fetchPlayers = createAsyncThunk(
//   'players/fetchPlayers',
//   async (cardId, thunkAPI) => {
//     try {
//       const playersRef = ref(database, `players/${cardId}`);
//       const snapshot = await get(playersRef);
//       if (snapshot.exists()) {
//         const data = snapshot.val();
//         return {
//           cardId,
//           players: Object.values(data),
//         };
//       } else {
//         return thunkAPI.rejectWithValue('No found players answers');
//       }
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, set, get } from 'firebase/database';
import { database } from '../../firebase/firebaseConfig.js';
import { selectUser } from '../../redux/auth/selectorsAuth'; // Припустимо, у тебе є такий селектор

export const registerGameParticipant = createAsyncThunk(
  'players/registerGameParticipant',
  async ({ cardId, userId }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const currentUser = selectUser(state); // Отримуємо дані користувача з Redux

      if (!currentUser?.uid) {
        return thunkAPI.rejectWithValue('User not authenticated');
      }

      const playersRef = ref(database, `players/${cardId}/${userId}`);
      const snapshot = await get(playersRef);

      if (snapshot.exists()) {
        // Гравець вже зареєстрований для цієї картки
        return { playerId: userId, cardId, playerData: snapshot.val() };
      } else {
        // Реєструємо гравця
        const playerData = {
          fullname: currentUser?.displayName || '', // Або отримай з іншого місця в стані
          email: currentUser?.email || '',
          // Додаткові дані профілю, якщо є
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
