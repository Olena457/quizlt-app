import { createSelector } from '@reduxjs/toolkit';

export const selectCustomCardsState = state => state.custom;
export const selectCustomCardsData = state => state.custom.data;
export const selectCustomCardsLoading = state => state.custom.loading;
export const selectCustomCardsError = state => state.custom.error;

export const selectSelectedCustomCard = state =>
  state.custom.selectedCustomCard;

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
