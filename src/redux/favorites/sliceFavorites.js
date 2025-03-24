import { createSlice } from '@reduxjs/toolkit';
import {
  fetchFavorites,
  toggleFavorite,
} from '../favorites/operationsFavorites.js';
import { logoutUser } from '../auth/operationsAuth.js';

const handlePending = state => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const favoritesInitialState = {
  items: [],
  loading: false,
  error: null,
};

const sliceFavorites = createSlice({
  name: 'favorites',
  initialState: favoritesInitialState,
  reducers: {
    setFavorites: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      //______________________ Fetch favorites
      .addCase(fetchFavorites.pending, handlePending)
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchFavorites.rejected, handleRejected)
      //_____________________________Toggle favorite
      .addCase(toggleFavorite.pending, handlePending)
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(toggleFavorite.rejected, handleRejected)
      //__________________________ Logout
      .addCase(logoutUser.fulfilled, () => favoritesInitialState);
  },
});

export const { setFavorites } = sliceFavorites.actions;
export const favoritesReducer = sliceFavorites.reducer;
