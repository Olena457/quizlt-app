export const selectCards = state => state.cards.cards;
export const selectFilter = state => state.cards.filter;
export const selectError = state => state.filter.error;

import { createSelector } from '@reduxjs/toolkit';

export const selectFilteredCards = createSelector(
  [selectCards, selectFilter],
  (cards, filter) => {
    if (!cards || cards.length === 0) {
      return [];
    }
    if (!filter || filter === 'All') {
      return cards;
    }
    return cards.filter(card => card.category === filter);
  }
);
