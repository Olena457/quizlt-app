import { createSlice } from '@reduxjs/toolkit';
import {
  addCustomCard,
  editCustomCard,
  deleteCustomCard,
  fetchCustomCardsByCategory,
} from './operationsCustomCards';

const initialState = {
  data: {}, // { [category]: [cards] }
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'customCards',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCustomCardsByCategory.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomCardsByCategory.fulfilled, (state, action) => {
        const { category, cards } = action.payload;
        state.loading = false;
        state.data[category] = cards;
      })
      .addCase(fetchCustomCardsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addCustomCard.fulfilled, (state, action) => {
        const { category } = action.payload;
        if (!state.data[category]) state.data[category] = [];
        state.data[category].push(action.payload);
      })

      .addCase(editCustomCard.fulfilled, (state, action) => {
        const { category, id } = action.payload;
        state.data[category] = state.data[category]?.map(card =>
          card.id === id ? action.payload : card
        );
      })

      .addCase(deleteCustomCard.fulfilled, (state, action) => {
        const { category, id } = action.payload;
        state.data[category] = state.data[category]?.filter(
          card => card.id !== id
        );
      });
  },
});

export const customCardsReducer = slice.reducer;
