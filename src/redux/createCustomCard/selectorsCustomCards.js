// export const selectCustomCards = state => state.customCards.data;

// export const selectCustomCardsLoading = state => state.customCards.loading;

// export const selectCustomCardsError = state => state.customCards.error;

// export const selectCustomCardsByCategory = (state, category) =>
//   state.customCards.data[category] || [];

// // search cftegory id
// export const selectCustomCardById = (state, category, id) =>
//   state.customCards.data[category]?.find(card => card.id === id);
// src/redux/customCards/selectorsCustomCards.js

import { createSelector } from '@reduxjs/toolkit';

export const selectCustomCardsState = state => state.customCards;
// Змінено: selectCustomCardsData тепер повертає об'єкт { [category]: { [cardId]: cardData } }
export const selectCustomCardsData = state => state.customCards.data;
export const selectCustomCardsLoading = state => state.customCards.loading;
export const selectCustomCardsError = state => state.customCards.error;
export const selectSelectedCustomCard = state =>
  state.customCards.selectedCustomCard; // Селектор для однієї картки

// Селектор для отримання всіх кастомних карток однієї категорії (як масив)
export const selectCustomCardsByCategory = createSelector(
  [selectCustomCardsData, (_, category) => category],
  (customCardsData, category) => {
    // Повертаємо масив значень з об'єкта, якщо категорія існує
    const categoryCardsObject = customCardsData[category];
    return categoryCardsObject ? Object.values(categoryCardsObject) : [];
  }
);

// Селектор для отримання конкретної кастомної картки за категорією та ID
export const selectCustomCardById = createSelector(
  [selectCustomCardsData, (_, category, id) => ({ category, id })],
  (customCardsData, { category, id }) => {
    // Звертаємося до об'єкта за категорією, а потім до картки за її ID
    return customCardsData[category]?.[id] || null;
  }
);
