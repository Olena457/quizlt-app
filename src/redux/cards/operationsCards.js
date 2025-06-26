// import { createAsyncThunk } from '@reduxjs/toolkit';
// import {
//   ref,
//   get,
//   set,
//   query,
//   orderByKey,
//   startAfter,
//   limitToFirst,
// } from 'firebase/database';
// import { auth, database } from '../../firebase/firebaseConfig.js';

// // __________________fetch cards
// export const fetchCards = createAsyncThunk(
//   'cards/fetchCards',
//   async (_, thunkAPI) => {
//     try {
//       const cardsRef = ref(database, 'cards');
//       const snapshot = await get(cardsRef);
//       if (snapshot.exists()) {
//         const data = snapshot.val();
//         if (typeof data === 'object' && data !== null) {
//           const cardsArray = Object.keys(data).map(id => ({
//             id,
//             ...data[id],
//           }));
//           return cardsArray;
//         } else {
//           return thunkAPI.rejectWithValue('Data format is not correct');
//         }
//       } else {
//         return thunkAPI.rejectWithValue('No data available');
//       }
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
// // ___________________fetch card by category
// export const fetchCardByCategory = createAsyncThunk(
//   'cards/fetchCardByCategory',
//   async (category, thunkAPI) => {
//     try {
//       // upload database cards/{category}
//       const cardRef = ref(database, `cards/${category}`);
//       const snapshot = await get(cardRef);
//       const officialCards = snapshot.exists()
//         ? Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data }))
//         : [];

//       // uploadet users questions  if there are any
//       const customRef = ref(database, `customCards/${category}`);
//       const customSnap = await get(customRef);

//       // no user questions
//       // if (!customSnap.exists()) {
//       const customCards = customSnap.exists()
//         ? Object.entries(customSnap.val()).map(([id, data]) => ({
//             id,
//             ...data,
//           }))
//         : [];

//       // combine official and custom questions
//       // if (officialCards.length === 0 && customCards.length === 0) {
//       const combined = [...officialCards, ...customCards];

//       return { category, data: combined };
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// // __________________register participant

// export const registerParticipant = createAsyncThunk(
//   'cards/players',
//   async ({ fullname, email, phoneNumber, question, cardID }, thunkAPI) => {
//     try {
//       const user = auth.currentUser;
//       const uid = user.uid;

//       const contactRef = ref(database, `players/${cardID}/${uid}`);

//       await set(contactRef, {
//         fullname,
//         email,
//         phoneNumber,
//         cardID,
//         question,
//       });
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// // __________________fetch cards with pagination

// export const fetchCardsPaginated = createAsyncThunk(
//   'cards/fetchCardsPaginated',
//   async ({ lastKey = null }, thunkAPI) => {
//     try {
//       const cardsRef = ref(database, 'cards');

//       const cardsQuery = lastKey
//         ? query(cardsRef, orderByKey(), startAfter(lastKey), limitToFirst(4))
//         : query(cardsRef, orderByKey(), limitToFirst(4));

//       const snapshot = await get(cardsQuery);

//       if (snapshot.exists()) {
//         const data = snapshot.val();

//         const cardsArray = Object.keys(data).map(id => ({
//           id,
//           ...data[id],
//         }));

//         const result = {
//           cards: cardsArray,
//           lastKey: cardsArray[cardsArray.length - 1]?.id || null,
//         };

//         return result;
//       } else {
//         return thunkAPI.rejectWithValue('No data available');
//       }
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
// src/redux/cards/operationsCards.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, get } from 'firebase/database';
import { database } from '../../firebase/firebaseConfig.js';

// __________________fetchAllCategoriesData
export const fetchAllCategoriesData = createAsyncThunk(
  'cards/fetchAllCategoriesData',
  async (_, thunkAPI) => {
    try {
      const categoriesRef = ref(database, 'categories');
      const snapshot = await get(categoriesRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const categoriesArray = Object.keys(data).map(categoryName => ({
          name: categoryName,
          title: data[categoryName].title,
          description: data[categoryName].description,
        }));
        return categoriesArray;
      } else {
        return thunkAPI.rejectWithValue('No categories available');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ___________________fetchCardByCategory

export const fetchCardByCategory = createAsyncThunk(
  'cards/fetchCardByCategory',
  async (categoryName, thunkAPI) => {
    try {
      const categoryRef = ref(database, `categories/${categoryName}`);
      const categorySnap = await get(categoryRef);

      let officialQuestions = [];
      let categoryMetaData = null;

      if (categorySnap.exists()) {
        const categoryData = categorySnap.val();
        const { quizzes, ...metaData } = categoryData;
        categoryMetaData = metaData;

        if (quizzes) {
          officialQuestions = Object.entries(quizzes).map(([id, data]) => ({
            id,
            // category: categoryName, // categoryName передається в Thunk
            ...data,
          }));
        }
      }

      const customRef = ref(database, `customCards/${categoryName}`);
      const customSnap = await get(customRef);
      const customQuestions = customSnap.exists()
        ? Object.entries(customSnap.val()).map(([id, data]) => ({
            id,
            // category: categoryName,
            isCustom: true,
            ...data,
          }))
        : [];

      const combined = [...officialQuestions, ...customQuestions];

      return {
        category: categoryName,
        metaData: categoryMetaData,
        data: combined,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
