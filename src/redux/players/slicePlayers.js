// src/redux/players/slicePlayers.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchPlayers, registerGameParticipant } from './operationsPlayers.js'; // Імпортуємо registerGameParticipant

const initialState = {
  data: {}, // Об'єкт для зберігання гравців за категоріями: { 'categoryName': [player1, player2], ... }
  loading: false,
  error: null,
};

const slicePlayers = createSlice({
  name: 'players',
  initialState,
  reducers: {
    // Якщо потрібен якийсь редюсер для очищення стану гравців або подібного
  },
  extraReducers: builder => {
    builder
      // Обробка fetchPlayers
      .addCase(fetchPlayers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.loading = false;
        // Зберігаємо масив гравців для певної категорії
        state.data[action.payload.category] = action.payload.players;
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load players';
      })

      // Обробка registerGameParticipant
      .addCase(registerGameParticipant.pending, state => {
        state.loading = true; // Можливо, варто показати, що йде збереження
        state.error = null;
      })
      .addCase(registerGameParticipant.fulfilled, (state, action) => {
        state.loading = false;
        const { category, playerData } = action.payload;
        // Оновлюємо список гравців для цієї категорії
        if (!state.data[category]) {
          state.data[category] = [];
        }
        // Знаходимо і оновлюємо існуючий результат або додаємо новий
        const existingIndex = state.data[category].findIndex(
          p => p.userId === playerData.userId
        );
        if (existingIndex !== -1) {
          state.data[category][existingIndex] = playerData;
        } else {
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
