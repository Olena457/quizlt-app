// import { createSlice } from '@reduxjs/toolkit';
// import { addCard, deleteCard, fetchCards } from './operationsCreateCard.js';

// const initialState = {
//   data: [],
//   loading: false,
//   error: null,
// };

// const createCardSlice = createSlice({
//   name: 'createCard',
//   initialState,
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       .addCase(fetchCards.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCards.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//       })
//       .addCase(fetchCards.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(addCard.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(addCard.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data.push(action.payload);
//       })
//       .addCase(addCard.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(deleteCard.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteCard.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = state.data.filter(card => card.id !== action.payload);
//       })
//       .addCase(deleteCard.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const createCardReducer = createCardSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';
import {
  addCard,
  deleteCard,
  fetchCards,
  editCard,
} from './operationsCreateCard.js';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const createCardSlice = createSlice({
  name: 'createCard',
  initialState,
  reducers: {},
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
      .addCase(addCard.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCard.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCard.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(card => card.id !== action.payload);
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editCard.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.map(card =>
          card.id === action.payload.id ? action.payload : card
        );
      })
      .addCase(editCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const createCardReducer = createCardSlice.reducer;
