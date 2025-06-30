import { createSlice } from '@reduxjs/toolkit';
import {
  addCustomCard,
  editCustomCard,
  deleteCustomCard,
  fetchCustomCardsByCategory,
  fetchCustomCardById, // <--- Додано імпорт нового Thunk'а
} from './operationsCustomCards';

const initialState = {
  data: {}, // { [category]: { [cardId]: cardData } }
  selectedCustomCard: null, // edit card data
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'customCards',
  initialState,
  reducers: {
    clearSelectedCustomCard(state) {
      state.selectedCustomCard = null;
    },
  },
  extraReducers: builder => {
    builder
      // fetchCustomCardsByCategory
      .addCase(fetchCustomCardsByCategory.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomCardsByCategory.fulfilled, (state, action) => {
        const { category, cards } = action.payload;
        state.loading = false;

        state.data[category] = cards.reduce((acc, card) => {
          acc[card.id] = card;
          return acc;
        }, {});
      })
      .addCase(fetchCustomCardsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // addCustomCard
      .addCase(addCustomCard.fulfilled, (state, action) => {
        const { id, category } = action.payload;
        if (!state.data[category]) {
          state.data[category] = {};
        }
        state.data[category][id] = action.payload;
        state.loading = false;
      })
      .addCase(addCustomCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addCustomCard.pending, state => {
        // Додайте pending
        state.loading = true;
        state.error = null;
      })

      // editCustomCard
      .addCase(editCustomCard.fulfilled, (state, action) => {
        const { id, category, ...updatedCardData } = action.payload;
        if (state.data[category] && state.data[category][id]) {
          //  ID
          state.data[category][id] = {
            ...state.data[category][id],
            ...updatedCardData,
          };
        }
        state.loading = false;
        state.selectedCustomCard = null;
      })
      .addCase(editCustomCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editCustomCard.pending, state => {
        state.loading = true;
        state.error = null;
      })

      // deleteCustomCard
      .addCase(deleteCustomCard.fulfilled, (state, action) => {
        const { category, id } = action.payload;
        if (state.data[category]) {
          delete state.data[category][id];
        }
        state.loading = false;
      })
      .addCase(deleteCustomCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCustomCard.pending, state => {
        state.loading = true;
        state.error = null;
      })

      // fetchCustomCardById
      .addCase(fetchCustomCardById.pending, state => {
        state.loading = true;
        state.error = null;
        state.selectedCustomCard = null;
      })
      .addCase(fetchCustomCardById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCustomCard = action.payload;
      })
      .addCase(fetchCustomCardById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedCustomCard } = slice.actions;
export const customCardsReducer = slice.reducer;
