// import { createSlice } from '@reduxjs/toolkit';
// import { fetchPlayers, registerGameParticipant } from './operationsPlayers.js'; // Імпортуємо registerGameParticipant

// const initialState = {
//   data: {}, // { 'categoryName': [player1, player2], ... }
//   loading: false,
//   error: null,
// };

// const slicePlayers = createSlice({
//   name: 'players',
//   initialState,
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       //  fetchPlayers
//       .addCase(fetchPlayers.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchPlayers.fulfilled, (state, action) => {
//         state.loading = false;
//         // save players by category
//         state.data[action.payload.category] = action.payload.players;
//       })
//       .addCase(fetchPlayers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Failed to load players';
//       })

//       //  registerGameParticipant
//       .addCase(registerGameParticipant.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerGameParticipant.fulfilled, (state, action) => {
//         state.loading = false;
//         const { category, playerData } = action.payload;
//         // update the state with the new player data
//         if (!state.data[category]) {
//           state.data[category] = [];
//         }
//         // update existing player data if it exists
//         const existingIndex = state.data[category].findIndex(
//           p => p.userId === playerData.userId
//         );
//         if (existingIndex !== -1) {
//           state.data[category][existingIndex] = playerData;
//         } else {
//           state.data[category].push(playerData);
//         }
//       })
//       .addCase(registerGameParticipant.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Failed to register game results';
//       });
//   },
// });

// export const playersReducer = slicePlayers.reducer;
// src/redux/players/slicePlayers.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchPlayers, registerGameParticipant } from './operationsPlayers.js';

const initialState = {
  data: {}, // { 'categoryName': [player1_latest_result, player2_latest_result], ... }
  loading: false,
  error: null,
};

const slicePlayers = createSlice({
  name: 'players',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // fetchPlayers
      .addCase(fetchPlayers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.loading = false;
        // Зберігаємо останні результати для даної категорії
        state.data[action.payload.category] = action.payload.players;
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load players';
      })

      // registerGameParticipant
      .addCase(registerGameParticipant.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerGameParticipant.fulfilled, (state, action) => {
        state.loading = false;
        const { category, userId, playerData } = action.payload;

        // Якщо масиву для категорії ще немає, створюємо його
        if (!state.data[category]) {
          state.data[category] = [];
        }

        // Знаходимо індекс існуючого гравця за userId
        const existingIndex = state.data[category].findIndex(
          p => p.userId === userId
        );

        if (existingIndex !== -1) {
          // Якщо гравець вже існує, оновлюємо його останній результат
          state.data[category][existingIndex] = playerData;
        } else {
          // Якщо гравець новий, додаємо його результат до масиву
          state.data[category].push(playerData);
        }
      })
      .addCase(registerGameParticipant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to register game results';
      });
  },
});

export const playersReducer = slicePlayers.reducer;
