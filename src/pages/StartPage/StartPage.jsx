import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AccordionItem from '../../components/AccordionItem/AccordionItem.jsx';
import css from './StartPage.module.css';

const rules = [
  {
    title: 'Log in / Register',
    description:
      'Create your profile to save progress and compete with others.',
  },
  {
    title: 'Pick a Category',
    description: 'Choose topics that interest you for a tailored quiz.',
  },
  {
    title: 'Play the Quiz',
    description: 'Answer questions quickly and correctly to win!',
  },
  {
    title: 'See Your Stats',
    description: 'Track your score and see how you perform over time.',
  },
  {
    title: 'View Leaderboards',
    description: 'Track your progress in comparison to other players.',
  },
  {
    title: 'Add Questions',
    description: 'Create your own questions and expand the game.',
  },
  {
    title: 'Bonus Facts',
    description: 'Get rewarded with interesting facts for correct answers 🏆',
  },
];

const StartPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  const handlePlayClick = () => {
    navigate('/category');
  };
  return (
    <div className={css.pageStart}>
      <div className={css.startContainer}>
        <div className={css.startQuiz}>
          <h1 className={css.title}>Welcome to the Start Page</h1>

          <div className={css.rulesContainer}>
            {rules.map((rule, index) => (
              <AccordionItem
                key={index}
                title={rule.title}
                description={rule.description}
                isOpen={activeIndex === index}
                onClick={() =>
                  setActiveIndex(prev => (prev === index ? null : index))
                }
              />
            ))}
          </div>

          <button onClick={handlePlayClick} className={css.playButton}>
            Play Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartPage;

// return (
//   <div className={css.pageStart}>
//     <div className={css.startContainer}>
//       <div className={css.startQuiz}>
//         <div className={css.description}>
//           <h1 className={css.title}>Welcome to the Start Page</h1>
//           <p>Log in — register and create your profile.</p>
//           <p>Pick a category — pick what interests you.</p>
//           <p>Play the quiz — answer the questions correctly.</p>
//           <p>See your stats — check your score and speed.</p>
//           <p>View leaderboards — compare with others players.</p>
//           <p>Add your own questions — create, edit, or delete.</p>
//           <p>Play. Discover. Learn. Compete. Grow. 🏆</p>
//         </div>
//         <button onClick={handlePlayClick} className={css.playButton}>
//           Play Now
//         </button>
//       </div>
//     </div>
//   </div>
// );
