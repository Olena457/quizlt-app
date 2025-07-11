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

//   const MIN_BONUS_PERCENTAGE = 75;
//   const showBonusButton = accuracy >= MIN_BONUS_PERCENTAGE;

//   return (
//     <div className={css.containerResult}>
//       <QuizContainer>
//         <div className={css.title}>Quiz Results for {userName}</div>

//         <div className={css.description}>
//           {passed ? '<img src={tick} alt="tick" className={css.tick} />
//  You passed the quiz!' : '<img src={cross} alt="cross" className={css.cross} />
//  You failed the quiz!'}
//         </div>

//         <div className={css.box}>
//           <div className={css.description}>🎯 Category: {category}</div>
//           <div className={css.description}><img src={tick} alt="tick" className={css.tick} />You scored {accuracy}%!</div>
//           <div className={css.description}>
//             ⏳ Time taken: {timeTaken} seconds.
//           </div>
//           <div className={css.description}>
//           <img src={tick} alt="tick" className={css.tick} /> You answered {correctAnswersCount} out of {totalQuestions}&nbsp;
//             questions correctly.
//           </div>
//           <div className={css.description}>
//             {correctAnswersCount === totalQuestions
//               ? '<img src={cup} alt="cup" className={css.cup} /> Perfect score! You nailed every question!'
//               : '<img src={star} alt="star" className={css.star} /> Not bad! Try again to improve your score.'}
//           </div>
//         </div>

//         <div className={css.buttonGroup}>
//           <button
//             className={css.btnAgain}
//             type="button"
//             onClick={() => navigate('/category')}
//           >
//             Try Again
//           </button>
//           {showBonusButton && (
//             <button
//               type="button"
//               onClick={() => navigate('/bonus')}
//               className={css.bonusButton}
//             >
//               Bonys fact
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

import tickImg from '../../assets/icons/tick.svg';
import crossImg from '../../assets/icons/cross.svg';
import cupImg from '../../assets/icons/cup.svg';
import keyImg from '../../assets/icons/key.svg';
import secretImg from '../../assets/icons/secret.svg';

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

        <div className={css.descriptionMain}>
          <span className={css.inlineBlock}>
            <img
              width={30}
              height={30}
              src={passed ? cupImg : crossImg}
              alt={passed ? 'cupImg' : 'crossImg'}
              className={css.icon}
            />
          </span>
          {/* <p className={css.description}> */}
          {passed ? 'You passed the quiz!' : 'You failed the quiz!'}
        </div>

        <div className={css.box}>
          <div className={css.description}>
            <span className={css.inlineBlock}>
              <img
                src={secretImg}
                alt="secret"
                width={30}
                height={30}
                className={css.secret}
              />
            </span>
            Category: {category}
          </div>

          <div className={css.description}>
            <span className={css.inlineBlock}>
              <img src={tickImg} alt="tick" className={css.icon} />
            </span>
            You scored {accuracy}%!
          </div>

          <div className={css.description}>⏳ Time : {timeTaken} seconds.</div>

          <div className={css.description}>
            <span className={css.inlineBlock}>
              <img src={tickImg} alt="tick" className={css.icon} />
            </span>
            You answered {correctAnswersCount} out of {totalQuestions}
          </div>
          <p className={css.description}>questions correctly.</p>

          <div className={css.description}>
            {correctAnswersCount === totalQuestions ? (
              <>
                <span className={css.inlineBlock}>
                  <img src={cupImg} alt="cup" className={css.icon} />
                </span>
                <p className={css.description}>
                  Perfect score! You nailed every question!
                </p>
              </>
            ) : (
              <>
                <span className={css.inlineBlock}>
                  <img
                    src={keyImg}
                    alt="star"
                    width={20}
                    height={20}
                    className={css.icon}
                  />
                </span>
                <p className={css.description}>
                  Not bad! Try again to improve your score.
                </p>
              </>
            )}
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
              <span className={css.inlineBlock}>
                <img src={keyImg} alt="star" width={20} height={20} />
              </span>
              Bonus Fact
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
