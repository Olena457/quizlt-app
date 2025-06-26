// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { ref, get, set } from 'firebase/database';
// import { database } from '../../firebase/firebaseConfig';
// import { selectUser } from '../../redux/auth/selectorsAuth';

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
//         return thunkAPI.rejectWithValue('No players found for this card');
//       }
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const registerGameParticipant = createAsyncThunk(
//   'players/registerGameParticipant',
//   async (
//     { cardId, userId, category, timeTaken, correctAnswersCount },
//     thunkAPI
//   ) => {
//     try {
//       const state = thunkAPI.getState();
//       const currentUser = selectUser(state);

//       if (!currentUser?.uid) {
//         return thunkAPI.rejectWithValue('User not authenticated');
//       }

//       const playersRef = ref(database, `players/${cardId}/${userId}`);
//       const snapshot = await get(playersRef);

//       if (snapshot.exists()) {
//         return { playerId: userId, cardId, playerData: snapshot.val() };
//       } else {
//         const playerData = {
//           fullname: currentUser?.displayName || '',
//           email: currentUser?.email || '',
//           score: correctAnswersCount,
//           amount: 0,
//           category,
//           timeTaken,
//           userId: currentUser.uid,
//         };
//         await set(playersRef, playerData);
//         return { playerId: userId, cardId, playerData };
//       }
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
// src/redux/players/operationsPlayers.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, get, set } from 'firebase/database';
import { database } from '../../firebase/firebaseConfig';
import { selectUser } from '../../redux/auth/selectorsAuth';

export const fetchPlayers = createAsyncThunk(
  'players/fetchPlayers',
  async (categoryName, thunkAPI) => {
    // Перейменував cardId на categoryName для ясності
    try {
      const playersRef = ref(database, `players/${categoryName}`);
      const snapshot = await get(playersRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        // Firebase зберігає за userId, тому Object.values() поверне масив об'єктів-результатів
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
    // Приймаємо ті самі параметри, які передаємо з GamePage.jsx
    { category, userId, timeTaken, correctAnswersCount, totalQuestions },
    thunkAPI
  ) => {
    try {
      const state = thunkAPI.getState();
      const currentUser = selectUser(state); // Отримуємо дані користувача з Redux-стану

      if (!currentUser?.uid) {
        // Якщо користувач не авторизований, відхиляємо Thunk
        return thunkAPI.rejectWithValue('User not authenticated');
      }

      // Шлях у Firebase: players/{category}/{userId}
      const playerResultRef = ref(database, `players/${category}/${userId}`);

      // Дані для збереження
      const playerData = {
        fullname: currentUser?.displayName || 'Anonymous', // Використовуємо ім'я користувача
        email: currentUser?.email || 'N/A', // Використовуємо email користувача
        score: correctAnswersCount, // Результат
        timeTaken: timeTaken, // Час
        totalQuestions: totalQuestions, // Загальна кількість питань
        playedAt: new Date().toISOString(), // Додаємо мітку часу
        userId: currentUser.uid, // Зберігаємо UID для подальшого доступу
      };

      await set(playerResultRef, playerData); // Зберігаємо або оновлюємо результат

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
