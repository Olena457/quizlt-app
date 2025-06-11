import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/sliceAuth.js';
import { cardsReducer } from './cards/sliceCards.js';
import { playersReducer } from './players/slicePlayers.js';
import { createCardReducer } from './createCard/sliceCreateCard.js';
import filterReducer from './filter/sliceFilter.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    players: playersReducer,
    createCard: createCardReducer,
    cards: cardsReducer,
    filter: filterReducer,
  },
});
export default store;
