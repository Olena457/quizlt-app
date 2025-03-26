// export const selectCards = state => state.cards.cards;
// export const selectFilter = state => state.cards.filter;
// export const selectError = state => state.filter.error;

// import { createSelector } from '@reduxjs/toolkit';

// export const selectFilteredCards = createSelector(
//   [selectCards, selectFilter],
//   (cards, filter) => {
//     if (!cards || cards.length === 0) {
//       return [];
//     }
//     if (!filter || filter === 'All') {
//       return cards;
//     }
//     return cards.filter(card => card.category === filter);
//   }
// );
import { createSelector } from '@reduxjs/toolkit';

export const selectCards = state => state.cards.cards;
export const selectFilterCategory = state => state.filter.selectedCategory; // Змінено назву для кращого розуміння
export const selectError = state => state.filter.error;
export const selectAvailableCategories = state =>
  state.filter.availableCategories; // Новий селектор

export const selectFilteredCards = createSelector(
  [selectCards, selectFilterCategory],
  (cards, selectedCategory) => {
    if (!cards || cards.length === 0) {
      return [];
    }
    if (!selectedCategory || selectedCategory === 'All') {
      return cards;
    }
    return cards.filter(
      card =>
        card.category &&
        Array.isArray(card.category) &&
        card.category.includes(selectedCategory)
    );
  }
);
