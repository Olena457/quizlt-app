import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/sliceAuth.js';
import { cardsReducer } from './cards/sliceCards.js';
import { favoritesReducer } from './favorites/sliceFavorites.js';
import { playersReducer } from './players/slicePlayers.js';
import { createCardReducer } from './createCard/sliceCreateCard.js';
import filterReducer from './filter/sliceFilter.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cards: cardsReducer,
    favorites: favoritesReducer,
    players: playersReducer,
    createCard: createCardReducer,
    filter: filterReducer,
  },
});
export default store;
