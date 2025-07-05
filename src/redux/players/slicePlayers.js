import { createSlice } from '@reduxjs/toolkit';
import { fetchPlayers, registerGameParticipant } from './operationsPlayers.js';

const initialState = {
  data: {},
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

        if (!state.data[category]) {
          state.data[category] = [];
        }

        const existingIndex = state.data[category].findIndex(
          p => p.userId === userId
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
