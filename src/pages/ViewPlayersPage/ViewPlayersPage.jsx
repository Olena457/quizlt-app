import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayers } from '../../redux/players/operationsPlayers.js';
import {
  selectPlayersByCategory,
  selectPlayersLoading,
  selectPlayersError,
} from '../../redux/players/selectotsPlayers.js';
import Loader from '../../components/Loader/Loader.jsx';
import PlayersList from '../../components/PlayerList/PlayerList.jsx';
import css from './ViewPlayersPage.module.css';

const ViewPlayersPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const categorySelector = selectPlayersByCategory(id);
  const players = useSelector(categorySelector);
  const loading = useSelector(selectPlayersLoading);
  const error = useSelector(selectPlayersError);

  useEffect(() => {
    if (!players || players.length === 0) {
      dispatch(fetchPlayers(id));
    }
  }, [players, dispatch, id]);

  return (
    <>
      <div className={css.participPage}>
        <h2 className={css.title}>Players</h2>
        {loading && <Loader />}
        {error && <p className={css.error}>{error}</p>}
        {!loading && !error && players?.length > 0 && (
          <PlayersList players={players} />
        )}
        {!loading && !error && players?.length === 0 && (
          <p className={css.noPlayers}>No players in this category yet.</p>
        )}
      </div>

      <button onClick={() => navigate('/category')} className={css.backButton}>
        ← Go Back
      </button>
    </>
  );
};

export default ViewPlayersPage;
