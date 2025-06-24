import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setCategoryFilter } from '../../redux/filter/sliceFilter.js';
import CategoryItem from '../../components/CategoryItem/CategoryItem.jsx';
import css from './CategoryPage.module.css';

import brainIcon from '../../assets/icons/brainIcon.svg';
import progIcon from '../../assets/icons/progIcon.svg';
import geoIcon from '../../assets/icons/geoIcon.svg';
import scienIcon from '../../assets/icons/scienIcon.svg';
import worldIcon from '../../assets/icons/worldIcon.svg';
import techIcon from '../../assets/icons/techIcon.svg';

const categories = [
  // { icon: brainIcon, title: 'general' },
  // { icon: worldIcon, title: 'geography' },
  // { icon: scienIcon, title: 'science' },
  // { icon: geoIcon, title: 'movie' },
  // { icon: techIcon, title: 'technologies' },
  // { icon: progIcon, title: 'programming' },

  { icon: brainIcon, title: 'general' },
  { icon: worldIcon, title: 'maths' },
  { icon: geoIcon, title: 'history' },
  { icon: scienIcon, title: 'art' },
  { icon: techIcon, title: 'animals' },
  { icon: progIcon, title: 'coding' },
];

const CategoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

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
          <div className={css.categoryButtons}>
            {categories.map((category, index) => (
              <CategoryItem
                key={index}
                title={category.title}
                onSelect={handleCategorySelect}
                icon={category.icon}
              />
            ))}
          </div>
          <button className={css.buttonStart} onClick={handleStartQuiz}>
            Play Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
