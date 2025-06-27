import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/sliceAuth.js';
import { cardsReducer } from './cards/sliceCards.js';
import { playersReducer } from './players/slicePlayers.js';
import { customCardsReducer } from './castom/sliceCustomCards.js';
import filterReducer from './filter/sliceFilter.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    players: playersReducer,
    cards: cardsReducer,
    filter: filterReducer,
    custom: customCardsReducer,
  },
});
export default store;
