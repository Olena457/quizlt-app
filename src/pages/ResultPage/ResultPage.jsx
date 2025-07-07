// import { useNavigate, useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { selectUser } from '../../redux/auth/selectorsAuth.js';
// import QuizContainer from '../../components/QuizeContainer/QuizeContainer.jsx';
// import css from './ResultPage.module.css';

// const ResultPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const currentUser = useSelector(selectUser);

//   const userName = location.state?.userName || currentUser?.name || 'Guest';
//   const correctAnswersCount = location.state?.correctAnswersCount ?? null;
//   const totalQuestions = location.state?.totalQuestions ?? null;
//   const timeTaken = location.state?.timeTaken ?? null;
//   const category = location.state?.category || 'Unknown Category';

//   if (
//     correctAnswersCount === null ||
//     totalQuestions === null ||
//     timeTaken === null
//   ) {
//     return (
//       <QuizContainer>
//         <p className={css.errorMessage}>Error: No game results found.</p>
//         <button
//           onClick={() => navigate('/category')}
//           className={css.goBackButton}
//         >
//           Try Again
//         </button>
//       </QuizContainer>
//     );
//   }

//   const accuracy = ((correctAnswersCount / totalQuestions) * 100).toFixed(2);
//   const passed = accuracy >= 50;

//   const handleBonusClick = () => {
//     navigate('/bonus');
//   };

//   return (
//     <div className={css.containerResult}>
//       <QuizContainer>
//         <div className={css.title}>Quiz Results for {userName}</div>

//         <div className={css.description}>
//           {passed ? '✅ You passed the quiz!' : '❌ You failed the quiz!'}
//         </div>

//         <div className={css.box}>
//           <div className={css.description}>🎯 Category: {category}</div>
//           <div className={css.description}>✅ You scored {accuracy}%!</div>
//           <div className={css.description}>
//             ⏳ Time taken: {timeTaken} seconds.
//           </div>
//           <div className={css.description}>
//             ✅ You answered {correctAnswersCount} out of {totalQuestions}&nbsp;
//             questions correctly.
//           </div>
//           <div className={css.description}>
//             {correctAnswersCount === totalQuestions
//               ? '🎉 Perfect score! You nailed every question!'
//               : '✨ Not bad!Try again to improve your score.'}
//           </div>
//         </div>
//         <div className={css.containerButtons}>
//           <button
//             className={css.btnAgain}
//             type="button"
//             onClick={() => navigate('/category')}
//           >
//             Try Again
//           </button>
//           {correctAnswersCount === totalQuestions && (
//             <button
//               type="button"
//               onClick={handleBonusClick}
//               className={css.bonusButton}
//             >
//               Bonys fact 🎉
//             </button>
//           )}
//         </div>
//         <button
//           type="button"
//           onClick={() => navigate(`/players/${category}`)}
//           className={css.viewPlayersButton}
//         >
//           Result All Players from "{category}"
//         </button>
//       </QuizContainer>
//     </div>
//   );
// };

// export default ResultPage;
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectorsAuth.js';
import QuizContainer from '../../components/QuizeContainer/QuizeContainer.jsx';
import css from './ResultPage.module.css';

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useSelector(selectUser);

  const userName = location.state?.userName || currentUser?.name || 'Guest';
  const correctAnswersCount = location.state?.correctAnswersCount ?? null;
  const totalQuestions = location.state?.totalQuestions ?? null;
  const timeTaken = location.state?.timeTaken ?? null;
  const category = location.state?.category || 'Unknown Category';

  if (
    correctAnswersCount === null ||
    totalQuestions === null ||
    timeTaken === null
  ) {
    return (
      <QuizContainer>
        <p className={css.errorMessage}>Error: No game results found.</p>
        <button
          onClick={() => navigate('/category')}
          className={css.goBackButton}
        >
          Try Again
        </button>
      </QuizContainer>
    );
  }

  const accuracy = ((correctAnswersCount / totalQuestions) * 100).toFixed(2);
  const passed = accuracy >= 50;

  const MIN_BONUS_PERCENTAGE = 75;
  const showBonusButton = accuracy >= MIN_BONUS_PERCENTAGE;

  return (
    <div className={css.containerResult}>
      <QuizContainer>
        <div className={css.title}>Quiz Results for {userName}</div>

        <div className={css.description}>
          {passed ? '✅ You passed the quiz!' : '❌ You failed the quiz!'}
        </div>

        <div className={css.box}>
          <div className={css.description}>🎯 Category: {category}</div>
          <div className={css.description}>✅ You scored {accuracy}%!</div>
          <div className={css.description}>
            ⏳ Time taken: {timeTaken} seconds.
          </div>
          <div className={css.description}>
            ✅ You answered {correctAnswersCount} out of {totalQuestions}&nbsp;
            questions correctly.
          </div>
          <div className={css.description}>
            {correctAnswersCount === totalQuestions
              ? '🎉 Perfect score! You nailed every question!'
              : '✨ Not bad! Try again to improve your score.'}
          </div>
        </div>

        <div className={css.buttonGroup}>
          <button
            className={css.btnAgain}
            type="button"
            onClick={() => navigate('/category')}
          >
            Try Again
          </button>
          {showBonusButton && (
            <button
              type="button"
              onClick={() => navigate('/bonus')}
              className={css.bonusButton}
            >
              Bonys fact
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => navigate(`/players/${category}`)}
          className={css.viewPlayersButton}
        >
          Result All Players from "{category}"
        </button>
      </QuizContainer>
    </div>
  );
};

export default ResultPage;
