import css from './FavoritesCardPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import CardsListGame from '../../components/CardListGame/CardListGame.jsx';
import {
  selectFavorites,
  selectFavoritesLoading,
} from '../../redux/favorites/selectorsFavorites.js';
import Loader from '../../components/Loader/Loader.jsx';
import { useEffect } from 'react';
import { fetchFavorites } from '../../redux/favorites/operationsFavorites.js';

const FavoritesCardsPage = () => {
  const favoriteCards = useSelector(selectFavorites);
  const isLoading = useSelector(selectFavoritesLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  return (
    <div className={css.main}>
      {isLoading && <Loader />}

      {favoriteCards.length > 0 ? (
        <CardsListGame cards={favoriteCards} />
      ) : (
        <h3 className={css.title}>No favorites cards yet.</h3>
      )}
    </div>
  );
};

export default FavoritesCardsPage;
