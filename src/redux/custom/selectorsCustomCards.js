import { createSelector } from '@reduxjs/toolkit';

export const selectCustomCardsState = state => state.customCards;
export const selectCustomCardsData = state => state.customCards.data;
export const selectCustomCardsLoading = state => state.customCards.loading;
export const selectCustomCardsError = state => state.customCards.error;
export const selectSelectedCustomCard = state =>
  state.customCards.selectedCustomCard;

export const selectCustomCardsByCategory = createSelector(
  [selectCustomCardsData, (_, category) => category],

  (customCardsData, category) => {
    const categoryCardsObject = customCardsData[category];
    return categoryCardsObject ? Object.values(categoryCardsObject) : [];
  }
);

export const selectCustomCardById = createSelector(
  [selectCustomCardsData, (_, category, id) => ({ category, id })],
  (customCardsData, { category, id }) => {
    return customCardsData[category]?.[id] || null;
  }
);
