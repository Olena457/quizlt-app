import { useDispatch, useSelector } from 'react-redux';
import { setCategoryFilter } from '../../redux/filter/sliceFilter.js';
import {
  selectFilterCategory,
  selectAvailableCategories,
} from '../../redux/filter/selectorsFilter.js';
import css from './CategoryFilter.module.css';

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(selectFilterCategory);
  const availableCategories = useSelector(selectAvailableCategories);

  const handleFilterChange = event => {
    dispatch(setCategoryFilter(event.target.value));
  };

  return (
    <div className={css.filterContainer}>
      <label htmlFor="categoryFilter" className={css.labelFilter}>
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
