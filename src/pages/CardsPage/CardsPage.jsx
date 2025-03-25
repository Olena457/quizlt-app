// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCards } from '../../redux/cards/operationsCards.js';
// import {
//   selectCardsLoading,
//   selectCards,
//   selectCardsError,
// } from '../../redux/cards/selectorsCards.js';
// import Loader from '../../components/Loader/Loader.jsx';
// import CardListGame from '../../components/CardListGame/CardListGame.jsx';
// import css from './CardsPage.module.css';
// import CategoryFilter from '../../components/CategoryFilter/CategoryFilter.jsx';
// import Pagination from '../../components/Pagination/Pagination.jsx';
// const CardsPage = () => {
//   const dispatch = useDispatch();
//   // const cards = useSelector(selectCreateCardData);
//   // const loading = useSelector(selectCreateCardLoading);
//   const error = useSelector(selectCardsError);
//   const loading = useSelector(selectCardsLoading);
//   const cards = useSelector(selectCards);

//   useEffect(() => {
//     dispatch(fetchCards());
//   }, [dispatch]);

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <div className={css.wrapperNoEvent}>
//           <h4 className={css.title}>Error: {error}</h4>{' '}
//         </div>
//       ) : cards.length > 0 ? (
//         <div className={css.wrapperCard}>
//           <CategoryFilter />
//           <CardListGame cards={cards} />
//         </div>
//       ) : (
//         <div className={css.wrapperNoEvent}>
//           <h4 className={css.title}>No data available.</h4>
//         </div>
//       )}
//       <Pagination
//         currentPage={currentPage}
//         totalPages={Math.ceil(cards.length / cardsPerPage)}
//         onPageChange={handlePageChange}
//       />
//     </>
//   );
// };

// export default CardsPage;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCards } from '../../redux/cards/operationsCards.js';
import {
  selectCardsLoading,
  selectCards,
  selectCardsError,
} from '../../redux/cards/selectorsCards.js';
import Loader from '../../components/Loader/Loader.jsx';
import CardListGame from '../../components/CardListGame/CardListGame.jsx';
import Pagination from '../../components/Pagination/Pagination.jsx';
import css from './CardsPage.module.css';

const CardsPage = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectCardsError);
  const loading = useSelector(selectCardsLoading);
  const cards = useSelector(selectCards);

  // Пагінація
  const [currentPage, setCurrentPage] = useState(1); // Поточна сторінка
  const cardsPerPage = 6; // Кількість карток на сторінку
  const totalPages = Math.ceil(cards.length / cardsPerPage); // Загальна кількість сторінок

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  // Отримуємо картки для поточної сторінки
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = page => {
    setCurrentPage(page); // Змінюємо поточну сторінку
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className={css.wrapperNoEvent}>
          <h4 className={css.title}>Error: {error}</h4>
        </div>
      ) : currentCards.length > 0 ? (
        <div className={css.wrapperCard}>
          {/* Список карток */}
          <CardListGame cards={currentCards} />

          {/* Пагінація */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
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
