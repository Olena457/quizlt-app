import { createSlice } from '@reduxjs/toolkit';
import { fetchPlayers } from './operationsPlayers.js';

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
      .addCase(fetchPlayers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        const existingPlayers = state.data[action.payload.cardId] || [];
        if (
          JSON.stringify(existingPlayers) !==
          JSON.stringify(action.payload.players)
        ) {
          state.data[action.payload.cardId] = action.payload.players;
        }
        state.loading = false;
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load players';
      });
  },
});

export const playersReducer = slicePlayers.reducer;
