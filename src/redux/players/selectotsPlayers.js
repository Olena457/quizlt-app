// import { createSelector } from 'reselect';

// export const selectPlayersState = state => state.players;
// export const selectPlayersData = state => state.players.data;
// export const selectPlayersLoading = state => state.players.loading;
// export const selectPlayersError = state => state.players.error;

// export const selectPlayersByCategory = categoryName =>
//   createSelector(
//     [selectPlayersData],
//     playersData => playersData[categoryName] || []
//   );

// export const selectPlayerResult = (categoryName, userId) =>
//   createSelector([selectPlayersByCategory(categoryName)], categoryPlayers =>
//     categoryPlayers.find(player => player.userId === userId)
//   );
// src/redux/players/selectotsPlayers.js
import { createSelector } from 'reselect';

export const selectPlayersState = state => state.players;
export const selectPlayersData = state => state.players.data;
export const selectPlayersLoading = state => state.players.loading;
export const selectPlayersError = state => state.players.error;

export const selectPlayersByCategory = categoryName =>
  createSelector(
    [selectPlayersData],
    playersData => playersData[categoryName] || []
  );

export const selectPlayerResult = (categoryName, userId) =>
  createSelector([selectPlayersByCategory(categoryName)], categoryPlayers =>
    categoryPlayers.find(player => player.userId === userId)
  );
