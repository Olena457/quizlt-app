// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCards } from '../../redux/cards/operationsCards.js';
// import {
//   selectCardsLoading,
//   selectCards,
//   selectCardsError,
// } from '../../redux/cards/selectorsCards.js';
// import Loader from '../../components/Loader/Loader.jsx';
// import CardListGame from '../../components/CardListGame/CardListGame.jsx';
// import Pagination from '../../components/Pagination/Pagination.jsx';
// import css from './CardsPage.module.css';

// const CardsPage = () => {
//   const dispatch = useDispatch();
//   const error = useSelector(selectCardsError);
//   const loading = useSelector(selectCardsLoading);
//   const cards = useSelector(selectCards);

//   const [currentPage, setCurrentPage] = useState(1);
//   const cardsPerPage = 6;
//   const totalPages = Math.ceil(cards.length / cardsPerPage);

//   useEffect(() => {
//     dispatch(fetchCards());
//   }, [dispatch]);

//   const indexOfLastCard = currentPage * cardsPerPage;
//   const indexOfFirstCard = indexOfLastCard - cardsPerPage;
//   const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

//   const handlePageChange = page => {
//     setCurrentPage(page);
//   };

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <div className={css.wrapperNoEvent}>
//           <h4 className={css.title}>Error: {error}</h4>
//         </div>
//       ) : currentCards.length > 0 ? (
//         <div className={css.wrapperCard}>
//           <CardListGame cards={currentCards} />

//           <div className={css.paginationContainer}>
//             <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={handlePageChange}
//             />
//           </div>
//         </div>
//       ) : (
//         <div className={css.wrapperNoEvent}>
//           <h4 className={css.title}>No data available.</h4>
//         </div>
//       )}
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
import { selectFilterCategory } from '../../redux/filter/selectorsFilter.js';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import CardListGame from '../../components/CardListGame/CardListGame.jsx';
import Pagination from '../../components/Pagination/Pagination.jsx';
import css from './CardsPage.module.css';

const CardsPage = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectCardsError);
  const loading = useSelector(selectCardsLoading);
  const allCards = useSelector(selectCards);
  const selectedCategory = useSelector(selectFilterCategory);

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;
  const totalPages = Math.ceil(allCards.length / cardsPerPage);

  useEffect(() => {
    dispatch(fetchCards());
    setCurrentPage(1);
  }, [dispatch, selectedCategory]);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = allCards.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className={css.wrapperNoEvent}>
          <h4 className={css.title}>Error: {error}</h4>
        </div>
      ) : (
        <div className={css.wrapperCard}>
          <CategoryFilter />
          {currentCards.length > 0 ? (
            <>
              <CardListGame cards={currentCards} />
              <div className={css.paginationContainer}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          ) : (
            <div className={css.wrapperNoEvent}>
              <h4 className={css.title}>No cards available for this filter.</h4>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CardsPage;
