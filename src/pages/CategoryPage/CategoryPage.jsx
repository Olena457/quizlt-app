import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { fetchAllCategoriesData } from '../../redux/cards/operationsCards.js';
import {
  selectAllCategories,
  selectCardsLoading,
  selectCardsError,
} from '../../redux/cards/selectorsCards.js';
import { setCategoryFilter } from '../../redux/filter/sliceFilter.js'; // Цей фільтр все ще потрібен для gamePage

import CategoryItem from '../../components/CategoryItem/CategoryItem.jsx';
import css from './CategoryPage.module.css';

import brainIcon from '../../assets/icons/brainIcon.svg';
import progIcon from '../../assets/icons/progIcon.svg';
import geoIcon from '../../assets/icons/geoIcon.svg';
import scienIcon from '../../assets/icons/scienIcon.svg';
import worldIcon from '../../assets/icons/worldIcon.svg';
import techIcon from '../../assets/icons/techIcon.svg';

const categoryIcons = {
  general: brainIcon,
  geography: worldIcon,
  movies: geoIcon,
  coding: progIcon,
  science: scienIcon,
  technologies: techIcon,
};

const CategoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoriesFromRedux = useSelector(selectAllCategories);
  const loading = useSelector(selectCardsLoading);
  const error = useSelector(selectCardsError);

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (categoriesFromRedux.length === 0 && !loading && !error) {
      dispatch(fetchAllCategoriesData());
    }
  }, [dispatch, categoriesFromRedux.length, loading, error]);

  const handleCategorySelect = title => {
    setSelectedCategory(title);
    dispatch(setCategoryFilter(title));
  };

  const handleStartQuiz = () => {
    if (selectedCategory) {
      navigate('/game');
    } else {
      toast.error('Please choose a category!');
    }
  };

  return (
    <div className={css.pageGame}>
      <div className={css.containerCategories}>
        <div className={css.gameContainerQuiz}>
          <div className={css.title}>Select Category</div>
          {loading && <p>Loading categories...</p>}
          {error && <p className={css.errorMessage}>Error: {error}</p>}
          {!loading && !error && categoriesFromRedux.length === 0 && (
            <p className={css.titleError}>
              No categories found. Please try again later.
            </p>
          )}
          {!loading && !error && categoriesFromRedux.length > 0 && (
            <div className={css.categoryButtons}>
              {categoriesFromRedux.map(category => (
                <CategoryItem
                  key={category.name}
                  title={category.name}
                  displayTitle={category.title}
                  description={category.description}
                  onSelect={handleCategorySelect}
                  icon={categoryIcons[category.name]}
                  isSelected={selectedCategory === category.name}
                />
              ))}
            </div>
          )}
          <div className={css.buttonWrapper}>
            <button className={css.buttonStart} onClick={handleStartQuiz}>
              Play Game
            </button>
            <button
              onClick={() => navigate('/create-question')}
              className={css.buttonStart}
            >
              Create Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
