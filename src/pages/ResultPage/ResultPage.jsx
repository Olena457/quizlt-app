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
          onClick={() => navigate('/catogory')}
          className={css.goBackButton}
        >
          Go to Home
        </button>
      </QuizContainer>
    );
  }

  const accuracy = ((correctAnswersCount / totalQuestions) * 100).toFixed(2);
  const passed = accuracy >= 50;

  return (
    <div className={css.containerResult}>
      <QuizContainer>
        <div className={css.title}>Quiz Results for {userName}</div>
        <div className={css.description}>
          {passed ? '✅ You passed the quiz!' : '❌ You failed the quiz!'}
        </div>

        <div className={css.box}>
          <div className={css.description}>✅ You scored {accuracy}%!</div>
          <div className={css.description}>
            ✅ You answered {correctAnswersCount} out of {totalQuestions}{' '}
            questions correctly.
          </div>
          <div className={css.description}>
            ⏳ Time taken: {timeTaken} seconds.
          </div>
          <div className={css.description}>🎯 Category: {category}</div>
        </div>

        <button type="submit" onClick={() => navigate('/category')}>
          Try Again
        </button>
      </QuizContainer>
    </div>
  );
};

export default ResultPage;
