import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCards } from '../../redux/cards/operationsCards.js';
import {
  selectFilteredCards,
  selectError,
} from '../../redux/filter/selectorsFilter.js';

import { selectCardsLoading } from '../../redux/cards/selectorsCards.js';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import CardListGame from '../../components/CardListGame/CardListGame.jsx';
import css from './FilterPage.module.css';

const FilterPage = () => {
  const dispatch = useDispatch();
  const cards = useSelector(selectFilteredCards);
  const loading = useSelector(selectCardsLoading);
  const error = useSelector(selectError);
  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  return (
    <div className={css.filterPage}>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className={css.error}>
          <h4>Error: {error}</h4>
        </div>
      ) : cards.length > 0 ? (
        <>
          <CategoryFilter />
          <CardListGame cards={cards} />
        </>
      ) : (
        <div className={css.noData}>
          <h4>No cards available for this filter.</h4>{' '}
        </div>
      )}
    </div>
  );
};

export default FilterPage;
