import css from './CardListGame.module.css';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectCreateCardError,
  selectCreateCardLoading,
} from '../../redux/createCard/selectorsCreateCard.js';
import CardGameItem from '../../components/CardGameItem/CardGameItem.jsx';
import Loader from '../Loader/Loader.jsx';

const CardListGame = ({ cards }) => {
  const loading = useSelector(selectCreateCardLoading);
  const error = useSelector(selectCreateCardError);

  const [visibleCards, setVisibleCards] = useState(cards || []);

  useEffect(() => {
    setVisibleCards(cards);
  }, [cards]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className={css.message}>Error loading cards: {error}</div>;
  }

  return (
    <>
      <div className={css.containerList}>
        <ul className={css.gallery}>
          {visibleCards.map(card => (
            <li key={card.id} className={css.galleryCard}>
              <CardGameItem card={card} />
            </li>
          ))}
        </ul>
        {!loading && cards?.length === 0 && (
          <div className={css.message}>No quiz cards found.</div>
        )}
      </div>
    </>
  );
};

export default CardListGame;
