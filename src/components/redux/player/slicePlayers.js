import { createSlice } from '@reduxjs/toolkit';
import { fetchPlayers } from './operationsPlayers.js';

const slicePlayers = createSlice({
  name: 'players',
  initialState: {
    data: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPlayers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.loading = false;
        state.data[action.payload.cardId] = action.payload.players;
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load players';
      });
  },
});

export const playersReducer = slicePlayers.reducer;
