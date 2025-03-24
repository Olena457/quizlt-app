import { createSelector } from '@reduxjs/toolkit';

export const selectFavorites = state => state.favorites.items;

export const selectFavoritesIds = createSelector([selectFavorites], items => {
  const ids = items.map(item => item.id);
  return ids;
});
export const selectFavoritesLoading = state => state.favorites.loading;
