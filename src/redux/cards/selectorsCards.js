// export const selectCards = state => state.cards.data;
// export const selectCardsLoading = state => state.cards.loading;
// export const selectCardsError = state => state.cards.error;
// export const selectCardsLastKey = state => state.cards.lastKey;

export const selectCardsState = state => state.cards;

export const selectCardsLoading = state => state.cards.loading;
export const selectCardsError = state => state.cards.error;

export const selectAllCategories = state => state.cards.allCategories;

export const selectSelectedCategoryData = state =>
  state.cards.selectedCategoryData;

export const selectSelectedCategoryQuestions = state =>
  state.cards.selectedCategoryQuestions;
