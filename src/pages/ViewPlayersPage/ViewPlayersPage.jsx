import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { featchPlayers } from '../../redux/players/operationsPlayers.js';
import {
  selectPlayers,
  selectPlayersLoading,
  selectPlayersError,
} from '../../redux/players/operationsPlayers.js';
import Loader from '../../components/Loader/Loader.jsx';
import css from './ViewPlayersPage.module.css';
import PlayersList from '../../components/PlayerList/PlayerList.jsx';

const ViewPlayersPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const players = useSelector(state => selectPlayers(state)[id] || []);
  const loading = useSelector(selectPlayersLoading);
  const error = useSelector(selectPlayersError);

  useEffect(() => {
    dispatch(featchPlayers(id));
  }, [dispatch, id]);

  return (
    <div className={css.participPage}>
      <h2 className={css.title}>Players</h2>
      {loading && <Loader />}
      {error && <p className={css.error}>{error}</p>}
      {!loading && !error && <PlayersList players={players} />}
    </div>
  );
};

export default ViewPlayersPage;
