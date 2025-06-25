import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCards,
  fetchCardsPaginated,
  fetchCardByCategory,
} from './operationsCards.js';

const initialState = {
  data: [],
  lastKey: null,
  // addedfor selecting a card
  selectedCard: null,
  loading: false,
  error: null,
};

const sliceCards = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setFilteredCards(state, action) {
      state.filtered = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCards.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCardsPaginated.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCardsPaginated.fulfilled, (state, action) => {
        state.data = [...state.data, ...action.payload.cards];
        state.lastKey = action.payload.lastKey;
        state.loading = false;
      })
      .addCase(fetchCardsPaginated.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCardByCategory.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCardByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCard = {
          id: action.payload.category,
          ...action.payload.data,
        };
      })
      .addCase(fetchCardByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const cardsReducer = sliceCards.reducer;
