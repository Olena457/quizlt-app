// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { ref, get, set } from 'firebase/database';
// import { database } from '../../firebase/firebaseConfig';
// import { selectUser } from '../../redux/auth/selectorsAuth';

// export const fetchPlayers = createAsyncThunk(
//   'players/fetchPlayers',
//   async (categoryName, thunkAPI) => {
//     try {
//       const playersRef = ref(database, `players/${categoryName}`);
//       const snapshot = await get(playersRef);
//       if (snapshot.exists()) {
//         const data = snapshot.val();
//         return {
//           category: categoryName,
//           // players: Object.values(data),
//           players: Object.entries(data).map(([uid, player]) => ({
//             ...player,
//             uid,
//           })),
//         };
//       } else {
//         return thunkAPI.rejectWithValue('No players found for this category');
//       }
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const registerGameParticipant = createAsyncThunk(
//   'players/registerGameParticipant',
//   async (
//     { category, userId, timeTaken, correctAnswersCount, totalQuestions },
//     thunkAPI
//   ) => {
//     try {
//       const state = thunkAPI.getState();
//       const currentUser = selectUser(state);

//       if (!currentUser?.uid) {
//         return thunkAPI.rejectWithValue('User not authenticated');
//       }

//       //  players/{category}/{userId}
//       const playerResultRef = ref(database, `players/${category}/${userId}`);

//       const playerData = {
//         userName: currentUser?.displayName || currentUser?.name || 'Anonymous',
//         // fullname: currentUser?.displayName || 'Anonymous',
//         // email: currentUser?.email || 'N/A',
//         score: correctAnswersCount,
//         timeTaken: timeTaken,
//         totalQuestions: totalQuestions, //  total questions
//         // playedAt: new Date().toISOString(),
//         userId: currentUser.uid,
//         category,
//       };

//       await set(playerResultRef, playerData); // save or udate player data

//       return {
//         category: category,
//         userId: userId,
//         playerData: playerData,
//       };
//     } catch (error) {
//       console.error('Error registering game participant:', error);
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
// src/redux/players/operationsPlayers.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, get, set } from 'firebase/database'; // Видалено 'push'
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

        // Тепер categoryData буде об'єктом, де ключі - це userId, а значення - це останній результат гравця
        for (const userId in categoryData) {
          const playerData = categoryData[userId];
          if (typeof playerData === 'object' && playerData !== null) {
            allPlayersResults.push({
              ...playerData,
              userId: userId, // userId тепер є ключем, який ми додаємо як властивість
              // sessionId більше не потрібен, оскільки ми не зберігаємо кілька сесій
            });
          }
        }

        return {
          category: categoryName,
          players: allPlayersResults, // Це масив останніх результатів для кожного гравця
        };
      } else {
        return {
          category: categoryName,
          players: [], // Повертаємо порожній масив, якщо немає гравців
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

      // Шлях до місця, де буде зберігатися останній результат для цього користувача в цій категорії
      // Це перезапише попередній результат, якщо він існував
      const playerResultRef = ref(database, `players/${category}/${userId}`);

      const playerData = {
        userName: currentUser?.displayName || currentUser?.name || 'Anonymous',
        score: correctAnswersCount,
        timeTaken: timeTaken,
        totalQuestions: totalQuestions,
        category,
        playedAt: new Date().toISOString(), // Додаємо timestamp останньої гри
      };

      // Використовуємо set() для перезапису даних
      await set(playerResultRef, playerData);

      // Повертаємо дані разом з userId для оновлення Redux стану
      return {
        category: category,
        userId: userId,
        playerData: { ...playerData, userId: userId }, // Повертаємо повні дані для Redux
      };
    } catch (error) {
      console.error('Error registering game participant:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
