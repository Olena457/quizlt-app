import { createSelector } from 'reselect';

export const selectPlayers = state => state.players.data;
export const selectPlayersLoading = state => state.players.loading;
export const selectPlayersError = state => state.players.error;

export const selectPlayersById = createSelector(
  [selectPlayers, (_, id) => id],
  (players, id) => players[id] || []
);
