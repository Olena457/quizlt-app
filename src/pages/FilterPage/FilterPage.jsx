// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCards } from '../../redux/cards/operationsCards.js';
// import {
//   selectFilteredCards,
//   selectError,
// } from '../../redux/filter/selectorsFilter.js';

// import { selectCardsLoading } from '../../redux/cards/selectorsCards.js';
// import CategoryFilter from '../../components/CategoryFilter/CategoryFilter.jsx';
// import Loader from '../../components/Loader/Loader.jsx';
// import CardListGame from '../../components/CardListGame/CardListGame.jsx';
// import css from './FilterPage.module.css';

// const FilterPage = () => {
//   const dispatch = useDispatch();
//   const cards = useSelector(selectFilteredCards);
//   const loading = useSelector(selectCardsLoading);
//   const error = useSelector(selectError);
//   useEffect(() => {
//     dispatch(fetchCards());
//   }, [dispatch]);

//   return (
//     <div className={css.filterPage}>
//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <div className={css.error}>
//           <h4>Error: {error}</h4>
//         </div>
//       ) : cards.length > 0 ? (
//         <>
//           <CategoryFilter />
//           <CardListGame cards={cards} />
//         </>
//       ) : (
//         <div className={css.noData}>
//           <h4>No cards available for this filter.</h4>{' '}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FilterPage;
import React, { useEffect, useState } from 'react';
import { fetchCardsByCategory } from '../../services/fireBaseService.js';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import CardListGame from '../../components/CardListGame/CardListGame';
import Loader from '../../components/Loader/Loader';
import css from './FilterPage.module.css';

const FilterPage = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('Astronomy');

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        const fetchedCards = await fetchCardsByCategory(category);
        setCards(fetchedCards);
      } catch (error) {
        console.error('Error fetching cards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [category]);

  const handleCategoryChange = newCategory => {
    setCategory(newCategory);
  };

  return (
    <div className={css.filterPage}>
      <CategoryFilter
        onCategoryChange={handleCategoryChange}
        selectedCategory={category}
      />
      {loading ? (
        <Loader />
      ) : cards.length > 0 ? (
        <CardListGame cards={cards} />
      ) : (
        <div>No cards available for this category.</div>
      )}
    </div>
  );
};

export default FilterPage;
