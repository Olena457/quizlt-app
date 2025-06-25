// export const selectCreateCardData = state => state.createCard.data;
// export const selectCreateCardLoading = state => state.createCard.loading;
// export const selectCreateCardError = state => state.createCard.error;
// export const selectCardById = (state, id) =>
//   state.createCard.data.find(card => card.id === id);
//

export const selectCustomCards = state => state.customCards.data;

export const selectCustomCardsLoading = state => state.customCards.loading;

export const selectCustomCardsError = state => state.customCards.error;

export const selectCustomCardsByCategory = (state, category) =>
  state.customCards.data[category] || [];

// search cftegory id
export const selectCustomCardById = (state, category, id) =>
  state.customCards.data[category]?.find(card => card.id === id);
