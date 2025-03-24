// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { ref, push, remove, get } from 'firebase/database';
// import { database } from '../../firebase/firebaseConfig.js';

// export const addCard = createAsyncThunk(
//   'createCard/addCard',
//   async (newCard, thunkAPI) => {
//     try {
//       const cardsRef = ref(database, 'cards');
//       const newCardRef = await push(cardsRef, newCard);
//       return { id: newCardRef.key, ...newCard };
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const deleteCard = createAsyncThunk(
//   'createCard/deleteCard',
//   async (cardId, thunkAPI) => {
//     try {
//       const cardRef = ref(database, `cards/${cardId}`);
//       await remove(cardRef);
//       return cardId;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const fetchCards = createAsyncThunk(
//   'createCard/fetchCards',
//   async (_, thunkAPI) => {
//     try {
//       const cardsRef = ref(database, 'cards');
//       const snapshot = await get(cardsRef);
//       const cards = [];
//       snapshot.forEach(childSnapshot => {
//         cards.push({ id: childSnapshot.key, ...childSnapshot.val() });
//       });
//       return cards;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
// ________________________
// 'createCard/addCard',
// async (newCard, thunkAPI) => {
//   try {
//     const cardsRef = ref(database, 'cards');
//     const newCardRef = await push(cardsRef, newCard);
//     return { id: newCardRef.key, ...newCard };
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.message);
//   }
// }
// ____________________________________
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, push, remove, get, update } from 'firebase/database';
import { database } from '../../firebase/firebaseConfig.js';

export const addCard = createAsyncThunk(
  'createCard/addCard',
  async (newCard, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().auth.userId;
      const cardsRef = ref(database, 'cards');
      const newCardRef = await push(cardsRef, {
        ...newCard,
        creatorId: userId,
      });
      return { id: newCardRef.key, ...newCard, creatorId: userId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteCard = createAsyncThunk(
  'createCard/deleteCard',
  async (cardId, thunkAPI) => {
    try {
      const cardRef = ref(database, `cards/${cardId}`);
      await remove(cardRef);
      return cardId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCards = createAsyncThunk(
  'createCard/fetchCards',
  async (_, thunkAPI) => {
    try {
      const cardsRef = ref(database, 'cards');
      const snapshot = await get(cardsRef);
      const cards = [];
      snapshot.forEach(childSnapshot => {
        cards.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      return cards;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editCard = createAsyncThunk(
  'createCard/editCard',
  async ({ id, updatedCard }, thunkAPI) => {
    try {
      // updated card
      const cardRef = ref(database, `cards/${id}`);
      await update(cardRef, updatedCard);

      return { id, ...updatedCard };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
