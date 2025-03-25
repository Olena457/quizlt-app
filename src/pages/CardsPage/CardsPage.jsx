// import { useEffect, useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCards } from '../../redux/cards/operationsCards.js';
// import {
//   selectCreateCardData,
//   selectCreateCardLoading,
// } from '../../redux/createCard/selectorsCreateCard.js';
// import Loader from '../../components/Loader/Loader.jsx';
// import CardListGame from '../../components/CardListGame/CardListGame.jsx';
// import CategoryFilter from '../../components/CategoryFilter/CategoryFilter.jsx';
// import css from './CardsPage.module.css';

// const CardsPage = () => {
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   const cards = useSelector(selectCreateCardData);
//   const loading = useSelector(selectCreateCardLoading);

//   useEffect(() => {
//     dispatch(fetchCards());
//   }, [dispatch]);

//   const card = useMemo(() => cards.find(card => card.id === id), [cards, id]);

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : cards.length > 0 ? (
//         <div className={css.wrapperCard}>
//           <CategoryFilter />
//           <CardListGame cards={cards} />
//         </div>
//       ) : (
//         <div className={css.wrapperNoEvent}>
//           <h4 className={css.title}>Quiz card no found</h4>
//         </div>
//       )}
//     </>
//   );
// };

// export default CardsPage;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCards } from '../../redux/cards/operationsCards.js';
import {
  selectCardsLoading,
  selectCards,
  selectCardsError,
} from '../../redux/cards/selectorsCards.js';
// import {
//   selectCreateCardData,
//   selectCreateCardLoading,
// } from '../../redux/createCard/selectorsCreateCard.js';
import Loader from '../../components/Loader/Loader.jsx';
import CardListGame from '../../components/CardListGame/CardListGame.jsx';
import css from './CardsPage.module.css';

const CardsPage = () => {
  const dispatch = useDispatch();
  // const cards = useSelector(selectCreateCardData);
  // const loading = useSelector(selectCreateCardLoading);
  const error = useSelector(selectCardsError);
  const loading = useSelector(selectCardsLoading);
  const cards = useSelector(selectCards);

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className={css.wrapperNoEvent}>
          <h4 className={css.title}>Error: {error}</h4>{' '}
        </div>
      ) : cards.length > 0 ? (
        <div className={css.wrapperCard}>
          <CategoryFilter />
          <CardListGame cards={cards} />
        </div>
      ) : (
        <div className={css.wrapperNoEvent}>
          <h4 className={css.title}>No data available.</h4>
        </div>
      )}
    </>
  );
};

export default CardsPage;
