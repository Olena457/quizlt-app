import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/sliceAuth.js';
import { categoriesReducer } from './categories/categoriesSlice.js';
import { playersReducer } from './players/slicePlayers.js';
import { customCardsReducer } from './custom/sliceCustomCards.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    players: playersReducer,
    categories: categoriesReducer,
    custom: customCardsReducer,
  },
});
export default store;
