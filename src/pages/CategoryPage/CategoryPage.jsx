// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import css from './CategoryPage.module.css';

// const CategoryPage = () => {
//   const categories = [
//     'general',
//     'geography',
//     'science'
//     'movie',
//     'technologies',
//     'programming',
//   ];

//   const navigate = useNavigate();
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const handleCategorySelect = category => {
//     setSelectedCategory(category);
//   };

//   const handleStartQuiz = () => {
//     if (ategory) {
//       navigate(`/category/${selectedCategory}`);
//     } else {
//       alert('Please choose a category!');
//     }
//   };

//   return (
//     <div className={css.containerCategories}>
//       <div className={css.title}>Choose a Category</div>
//       <div className={css.categoryButtons}>
//         {categories.map(category => (
//           <button key={index} onClick={() => handleCategorySelect(category)}>
//           </button>
//         ))}
//       </div>
//       <button className="start-button" onClick={handleStartQuiz}>
//         Start Quiz
//       </button>
//     </div>
//   );
// };

// export default CategoryPage;
// const categories = [
//   {
//     icon: (
//       <img
//         src={brainIcon}
//         alt="brain"
//         width="20"
//         height="20"
//         className={css.logo}
//       />
//     ),
//     title: 'General knowledge',
//   },
//   {
//     icon: (
//       <img
//         src={worldIcon}
//         alt="world"
//         width="20"
//         height="20"
//         className={css.logo}
//       />
//     ),
//     title: 'General knowledge',
//   },
//   {
//     icon: (
//       <img
//         src={scienceIcon}
//         alt="science"
//         width="20"
//         height="20"
//         className={css.logo}
//       />
//     ),
//     title: 'Science',
//   },
//   {
//     icon: (
//       <img
//         src={geoIcon}
//         alt="movie"
//         width="20"
//         height="20"
//         className={css.logo}
//       />
//     ),
//     title: 'Movie',
//   },
//   {
//     icon: (
//       <img
//         src={techIcon}
//         alt="techologies"
//         width="20"
//         height="20"
//         className={css.logo}
//       />
//     ),
//     title: 'Technologies',
//   },
//   {
//     icon: (
//       <img
//         src={progIcon}
//         alt="programmin"
//         width="20"
//         height="20"
//         className={css.logo}
//       />
//     ),
//     title: 'Programming',
//   },
// ];
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCategoryFilter } from '../../redux/filter/sliceFilter.js';
import CategoryItem from '../../components/CategoryItem/CategoryItem.jsx';
import QuizeContainer from '../../components/QuizeContainer/QuizeContainer.jsx';
import css from './CategoryPage.module.css';

import brainIcon from '../../assets/icons/brainIcon.svg';
import progIcon from '../../assets/icons/progIcon.svg';
import geoIcon from '../../assets/icons/geoIcon.svg';
import scienIcon from '../../assets/icons/scienIcon.svg';
import worldIcon from '../../assets/icons/worldIcon.svg';
import techIcon from '../../assets/icons/techIcon.svg';

const categories = [
  { icon: brainIcon, title: 'general' },
  { icon: worldIcon, title: 'geography' },
  { icon: scienIcon, title: 'science' },
  { icon: geoIcon, title: 'movie' },
  { icon: techIcon, title: 'technologies' },
  { icon: progIcon, title: 'programming' },

  { icon: brainIcon, title: 'general' },
  { icon: worldIcon, title: 'mathematics' },
  { icon: geoIcon, title: 'history' },
  { icon: geoIcon, title: 'art' },
  { icon: techIcon, title: 'animals' },
  { icon: progIcon, title: 'programming' },
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
      alert('Please choose a category!');
    }
  };

  return (
    <div className={css.containerCategories}>
      <QuizeContainer>
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
        <button onClick={handleStartQuiz}>Start Quiz</button>
      </QuizeContainer>
    </div>
  );
};

export default CategoryPage;
