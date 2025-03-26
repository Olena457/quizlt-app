// import { useDispatch, useSelector } from 'react-redux';
// import { setCategoryFilter } from '../../redux/filter/sliceFilter.js';
// import { selectFilter } from '../../redux/filter/selectorsFilter.js';
// import css from './CategoryFilter.module.css';

// const CategoryFilter = () => {
//   const dispatch = useDispatch();
//   const filter = useSelector(selectFilter);

//   const handleFilterChange = event => {
//     dispatch(setCategoryFilter(event.target.value));
//   };

//   return (
//     <div className={css.filterContainer}>
//       <label htmlFor="categoryFilter" className={css.label}>
//         Filter by Category:
//       </label>
//       <select
//         id="categoryFilter"
//         value={filter}
//         onChange={handleFilterChange}
//         className={css.select}
//       >
//         <option value="All">All</option>
//         <option value="Astronomy">Astronomy</option>
//         <option value="Geography">Geography</option>
//         <option value="Animals">Animals</option>
//       </select>
//     </div>
//   );
// };

// export default CategoryFilter;
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryFilter } from '../../redux/filter/sliceFilter.js';
import {
  selectFilterCategory,
  selectAvailableCategories,
} from '../../redux/filter/selectorsFilter.js'; // Оновлено імпорт
import css from './CategoryFilter.module.css';
import { useEffect } from 'react';
import { fetchCards } from '../../redux/cards/operationsCards.js'; // Імпортуємо fetchCards, якщо потрібно оновити категорії

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(selectFilterCategory);
  const availableCategories = useSelector(selectAvailableCategories);

  // Завантажуємо картки при першому рендерингу, щоб отримати категорії
  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  const handleFilterChange = event => {
    dispatch(setCategoryFilter(event.target.value));
  };

  return (
    <div className={css.filterContainer}>
      <label htmlFor="categoryFilter" className={css.label}>
        Filter by Category:
      </label>
      <select
        id="categoryFilter"
        value={selectedCategory}
        onChange={handleFilterChange}
        className={css.select}
      >
        {availableCategories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
