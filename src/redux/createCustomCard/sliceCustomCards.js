// import { createSlice } from '@reduxjs/toolkit';
// import {
//   addCustomCard,
//   editCustomCard,
//   deleteCustomCard,
//   fetchCustomCardsByCategory,
// } from './operationsCustomCards';

// const initialState = {
//   data: {}, // { [category]: [cards] }
//   loading: false,
//   error: null,
// };

// const slice = createSlice({
//   name: 'customCards',
//   initialState,
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       .addCase(fetchCustomCardsByCategory.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCustomCardsByCategory.fulfilled, (state, action) => {
//         const { category, cards } = action.payload;
//         state.loading = false;
//         state.data[category] = cards;
//       })
//       .addCase(fetchCustomCardsByCategory.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(addCustomCard.fulfilled, (state, action) => {
//         const { category } = action.payload;
//         if (!state.data[category]) state.data[category] = [];
//         state.data[category].push(action.payload);
//       })

//       .addCase(editCustomCard.fulfilled, (state, action) => {
//         const { category, id } = action.payload;
//         state.data[category] = state.data[category]?.map(card =>
//           card.id === id ? action.payload : card
//         );
//       })

//       .addCase(deleteCustomCard.fulfilled, (state, action) => {
//         const { category, id } = action.payload;
//         state.data[category] = state.data[category]?.filter(
//           card => card.id !== id
//         );
//       });
//   },
// });

// export const customCardsReducer = slice.reducer;
// src/redux/customCards/sliceCustomCards.js
import { createSlice } from '@reduxjs/toolkit';
import {
  addCustomCard,
  editCustomCard,
  deleteCustomCard,
  fetchCustomCardsByCategory,
  fetchCustomCardById, // <--- Додано імпорт нового Thunk'а
} from './operationsCustomCards';

const initialState = {
  // Змінено: data буде об'єктом, де ключами є категорії, а значеннями - об'єкти питань (id: question)
  data: {}, // { [category]: { [cardId]: cardData } }
  selectedCustomCard: null, // <--- Додано для збереження картки для редагування
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'customCards',
  initialState,
  reducers: {
    clearSelectedCustomCard(state) {
      // <--- Додано для очищення вибраної картки
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
        // Зберігаємо картки як об'єкт, щоб мати доступ за ID
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
          state.data[category] = {}; // Ініціалізуємо категорію як об'єкт, якщо її немає
        }
        state.data[category][id] = action.payload; // Додаємо картку за її ID
        state.loading = false; // Переконайтеся, що loading стає false
      })
      .addCase(addCustomCard.rejected, (state, action) => {
        // Додайте обробник помилок
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
          // Оновлюємо картку за її ID
          state.data[category][id] = {
            ...state.data[category][id],
            ...updatedCardData,
          };
        }
        state.loading = false; // Переконайтеся, що loading стає false
        state.selectedCustomCard = null; // Очищуємо вибрану картку після редагування
      })
      .addCase(editCustomCard.rejected, (state, action) => {
        // Додайте обробник помилок
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editCustomCard.pending, state => {
        // Додайте pending
        state.loading = true;
        state.error = null;
      })

      // deleteCustomCard
      .addCase(deleteCustomCard.fulfilled, (state, action) => {
        const { category, id } = action.payload;
        if (state.data[category]) {
          delete state.data[category][id]; // Видаляємо картку за її ID
        }
        state.loading = false; // Переконайтеся, що loading стає false
      })
      .addCase(deleteCustomCard.rejected, (state, action) => {
        // Додайте обробник помилок
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCustomCard.pending, state => {
        // Додайте pending
        state.loading = true;
        state.error = null;
      })

      // fetchCustomCardById (новий Thunk)
      .addCase(fetchCustomCardById.pending, state => {
        state.loading = true;
        state.error = null;
        state.selectedCustomCard = null; // Очищаємо попередню картку
      })
      .addCase(fetchCustomCardById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCustomCard = action.payload; // Зберігаємо завантажену картку
      })
      .addCase(fetchCustomCardById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedCustomCard } = slice.actions; // Експортуємо reducer action
export const customCardsReducer = slice.reducer;
