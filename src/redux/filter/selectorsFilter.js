import { createSelector } from '@reduxjs/toolkit';

export const selectCards = state => state.cards.data;

export const selectFilterCategory = state => state.filter.selectedCategory;
export const selectError = state => state.filter.error;

// filter available categories
export const selectAvailableCategories = createSelector(
  [selectCards],
  cards => {
    const categoriesSet = new Set();
    if (cards && cards.length > 0) {
      cards.forEach(card => {
        if (card.category && Array.isArray(card.category)) {
          card.category.forEach(cat => categoriesSet.add(cat));
        }
      });
    }
    return ['All', ...Array.from(categoriesSet)];
  }
);
//     filter set category
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
