import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { fetchAllCategoriesData } from '../../redux/categories/operationsCategories.js';
import {
  selectAllCategories,
  selectCategoriesLoading,
  selectCategoriesError,
} from '../../redux/categories/selectorsCategories.js';

import { selectIsLoggedIn } from '../../redux/auth/selectorsAuth.js';

import CategoryItem from '../../components/CategoryItem/CategoryItem.jsx';
import css from './CategoryPage.module.css';

import brainIcon from '../../assets/icons/brainIcon.svg';
import progIcon from '../../assets/icons/progIcon.svg';
import moviesIcon from '../../assets/icons/moviesIcon.svg';
import scienIcon from '../../assets/icons/scienIcon.svg';
import worldIcon from '../../assets/icons/worldIcon.svg';
import techIcon from '../../assets/icons/techIcon.svg';

const categoryIcons = {
  general: brainIcon,
  geography: worldIcon,
  movies: moviesIcon,
  coding: progIcon,
  science: scienIcon,
  technologies: techIcon,
};

const CategoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoriesFromRedux = useSelector(selectAllCategories);
  const loading = useSelector(selectCategoriesLoading);
  const error = useSelector(selectCategoriesError);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (categoriesFromRedux.length === 0 && !loading && !error) {
      dispatch(fetchAllCategoriesData());
    }
  }, [dispatch, categoriesFromRedux.length, loading, error]);

  const handleCategorySelect = name => {
    setSelectedCategory(name);
  };

  const handleStartQuiz = () => {
    if (!selectedCategory) {
      toast.error('Please choose a category!');
      return;
    }

    if (!isLoggedIn) {
      toast.info('Please log in to start the game.');
      navigate('/login');
    } else {
      navigate('/game', { state: { categoryName: selectedCategory } });
    }
  };

  const handleCreateQuestion = () => {
    if (!selectedCategory) {
      toast.error('Please select a category before creating a quiz!');
      return;
    }

    if (!isLoggedIn) {
      toast.info('Please log in to create a question.');
      navigate('/login');
    } else {
      navigate(`/create-question/${selectedCategory}`);
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
            <button className={css.buttonStart} onClick={handleCreateQuestion}>
              Create Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
