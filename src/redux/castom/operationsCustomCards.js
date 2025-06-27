// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { ref, push, get, set, remove, update } from 'firebase/database';
// import { database } from '../../firebase/firebaseConfig';
// import { selectUserId } from '../auth/selectorsAuth';

// export const addCustomCard = createAsyncThunk(
//   'customCards/add',
//   async (newCard, thunkAPI) => {
//     try {
//       const userId = selectUserId(thunkAPI.getState());
//       const cardRef = ref(database, `customCards/${newCard.category}`);
//       const newRef = push(cardRef);
//       const data = {
//         ...newCard,
//         creatorId: userId,
//         createdAt: Date.now(),
//       };
//       await set(newRef, data);
//       return { id: newRef.key, ...data };
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const editCustomCard = createAsyncThunk(
//   'customCards/edit',
//   async ({ category, id, updatedCard }, thunkAPI) => {
//     try {
//       const refToCard = ref(database, `customCards/${category}/${id}`);
//       await update(refToCard, updatedCard);
//       return { category, id, ...updatedCard };
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const deleteCustomCard = createAsyncThunk(
//   'customCards/delete',
//   async ({ category, id }, thunkAPI) => {
//     try {
//       const refToCard = ref(database, `customCards/${category}/${id}`);
//       await remove(refToCard);
//       return { category, id };
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const fetchCustomCardsByCategory = createAsyncThunk(
//   'customCards/fetchByCategory',
//   async (category, thunkAPI) => {
//     try {
//       const refToCards = ref(database, `customCards/${category}`);
//       const snapshot = await get(refToCards);
//       if (snapshot.exists()) {
//         const cards = Object.entries(snapshot.val()).map(([id, data]) => ({
//           id,
//           ...data,
//         }));
//         return { category, cards };
//       } else {
//         return { category, cards: [] };
//       }
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
// src/redux/customCards/operationsCustomCards.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, push, get, set, remove, update } from 'firebase/database';
import { database } from '../../firebase/firebaseConfig';
import { selectUserId } from '../auth/selectorsAuth';

// Thunk для додавання нового користувацького питання
export const addCustomCard = createAsyncThunk(
  'customCards/add',
  // Змінено: приймаємо деструктуризовані дані, включаючи category, question, options, correctAnswer
  async ({ category, question, options, correctAnswer }, thunkAPI) => {
    try {
      const userId = selectUserId(thunkAPI.getState());
      if (!userId) {
        throw new Error('User is not authenticated.');
      }

      // Шлях у Firebase: customCards/{categoryName}/{унікальний_ID_питання}
      const cardsRef = ref(database, `customCards/${category}`);
      const newRef = push(cardsRef); // Генеруємо унікальний ID для нового питання

      const dataToSave = {
        question,
        options,
        correctAnswer,
        createdBy: userId, // <-- Використовуємо 'createdBy' як у Firebase
        createdAt: new Date().toISOString(), // <-- Зберігаємо дату як ISO рядок
      };

      await set(newRef, dataToSave);
      return { id: newRef.key, category, ...dataToSave }; // Повертаємо ID та дані, включаючи category
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editCustomCard = createAsyncThunk(
  'customCards/edit',
  async ({ category, id, updatedCard }, thunkAPI) => {
    try {
      const refToCard = ref(database, `customCards/${category}/${id}`);
      // updatedCard  повинен містити { question, options, correctAnswer, createdBy }
      await update(refToCard, updatedCard);
      return { category, id, ...updatedCard };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteCustomCard = createAsyncThunk(
  'customCards/delete',
  async ({ category, id }, thunkAPI) => {
    try {
      const refToCard = ref(database, `customCards/${category}/${id}`);
      await remove(refToCard);
      return { category, id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCustomCardsByCategory = createAsyncThunk(
  'customCards/fetchByCategory',
  async (category, thunkAPI) => {
    try {
      const refToCards = ref(database, `customCards/${category}`);
      const snapshot = await get(refToCards);
      if (snapshot.exists()) {
        const cards = Object.entries(snapshot.val()).map(([id, data]) => ({
          id,
          ...data,
        }));
        return { category, cards };
      } else {
        return { category, cards: [] }; // Повертаємо пустий масив, якщо немає даних
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// НОВИЙ THUNK: Для отримання однієї картки за категорією та ID
export const fetchCustomCardById = createAsyncThunk(
  'customCards/fetchById',
  async ({ category, id }, thunkAPI) => {
    try {
      const cardRef = ref(database, `customCards/${category}/${id}`);
      const snapshot = await get(cardRef);
      if (snapshot.exists()) {
        return { id: snapshot.key, category, ...snapshot.val() }; // Включаємо category
      } else {
        return thunkAPI.rejectWithValue('Custom card not found');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
