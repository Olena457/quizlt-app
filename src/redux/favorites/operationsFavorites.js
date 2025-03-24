import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth, database } from '../../firebase/firebaseConfig.js';
import { get, ref, set } from 'firebase/database';

//_______________ Fetch favorites
export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (_, thunkAPI) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        return thunkAPI.rejectWithValue('User is not authenticated');
      }

      const favoritesRef = ref(database, `users/${user.uid}/favorites`);
      const snapshot = await get(favoritesRef);

      if (snapshot.exists()) {
        const favoritesObject = snapshot.val();
        const favoritesIds = Object.keys(favoritesObject);

        const cardPromises = favoritesIds.map(async id => {
          const cardRef = ref(database, `cards/${id}`);
          const cardSnapshot = await get(cardRef);
          return { id, ...cardSnapshot.val() };
        });

        const favoritesArray = await Promise.all(cardPromises);
        return favoritesArray;
      } else {
        return [];
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

//_______________________ Toggle favorite
export const toggleFavorite = createAsyncThunk(
  'cards/toggleFavorite',
  async (card, thunkAPI) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        return thunkAPI.rejectWithValue('User is not authenticated');
      }

      const favoritesRef = ref(database, `users/${user.uid}/favorites`);
      const snapshot = await get(favoritesRef);

      let favorites = {};
      if (snapshot.exists()) {
        favorites = snapshot.val();
      }

      if (favorites[card.id]) {
        delete favorites[card.id];
      } else {
        favorites[card.id] = true;
      }

      await set(favoritesRef, favorites);

      const updatedFavoritesIds = Object.keys(favorites);
      const cardPromises = updatedFavoritesIds.map(async id => {
        const teacherRef = ref(database, `cards/${id}`);
        const cardSnapshot = await get(teacherRef);
        return { id, ...cardSnapshot.val() };
      });

      const updatedFavoritesArray = await Promise.all(cardPromises);
      return updatedFavoritesArray;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
