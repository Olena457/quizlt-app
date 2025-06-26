// import { createSelector } from 'reselect';

// export const selectPlayers = state => state.players.data;
// export const selectPlayersLoading = state => state.players.loading;
// export const selectPlayersError = state => state.players.error;

// export const selectPlayersById = createSelector(
//   [selectPlayers, (_, id) => id],
//   (players, id) => players[id] || []
// );
// src/redux/players/selectorsPlayers.js
import { createSelector } from 'reselect';

export const selectPlayersState = state => state.players; //  селектор для всього стану players
export const selectPlayersData = state => state.players.data; // Об'єкт { 'category': [players], ... }
export const selectPlayersLoading = state => state.players.loading;
export const selectPlayersError = state => state.players.error;

// Викликати як: useSelector(selectPlayersByCategory('general'))
export const selectPlayersByCategory = categoryName =>
  createSelector(
    [selectPlayersData],
    playersData => playersData[categoryName] || []
  );

// Викликати як: useSelector(selectPlayerResult('general', currentUser.uid))
export const selectPlayerResult = (categoryName, userId) =>
  createSelector([selectPlayersByCategory(categoryName)], categoryPlayers =>
    categoryPlayers.find(player => player.userId === userId)
  );
