import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './CategoryPage.module.css';

const CategoryPage = () => {
  const categories = [
    'general',
    'geography',
    'science',
    'movie',
    'technologies',
    'programming',
  ];

  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = category => {
    setSelectedCategory(category);
  };

  const handleStartQuiz = () => {
    if (selectedCategory) {
      navigate(`/category/${selectedCategory}`);
    } else {
      alert('Please choose a category!');
    }
  };

  return (
    <div className={css.containerCategories}>
      <div className={css.title}>Choose a Category</div>
      <div className={css.categoryButtons}>
        {categories.map(category => (
          <button key={category} onClick={() => handleCategorySelect(category)}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      <button className="start-button" onClick={handleStartQuiz}>
        Start Quiz
      </button>
    </div>
  );
};

export default CategoryPage;
