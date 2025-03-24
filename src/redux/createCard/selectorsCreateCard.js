export const selectCreateCardData = state => state.createCard.data;
export const selectCreateCardLoading = state => state.createCard.loading;
export const selectCreateCardError = state => state.createCard.error;
export const selectCardById = (state, cardId) =>
  state.createCard.data.find(card => card.id === cardId);
