import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/filter/sliceFilter.js';
import { selectFilter } from '../../redux/filter/selectorsFilter.js';
import css from './CategoryFilter.module.css';

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleFilterChange = event => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <div className={css.filterContainer}>
      <label htmlFor="categoryFilter" className={css.label}>
        Filter by Category:
      </label>
      <select
        id="categoryFilter"
        value={filter}
        onChange={handleFilterChange}
        className={css.select}
      >
        <option value="All">All</option>
        <option value="Astronomy">Astronomy</option>
        <option value="Geography">Geography</option>
        <option value="Animals">Animals</option>
      </select>
    </div>
  );
};

export default CategoryFilter;
