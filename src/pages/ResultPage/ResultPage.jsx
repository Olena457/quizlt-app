import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectorsAuth.js';
import QuizContainer from '../../components/QuizeContainer/QuizeContainer.jsx';
import css from './ResultPage.module.css';

import tickImg from '../../assets/icons/tick.svg';
import crossImg from '../../assets/icons/cross.svg';
import cupImg from '../../assets/icons/cup.svg';
import okImg from '../../assets/icons/ok.svg';
import smileImg from '../../assets/icons/smile.svg';
import timeImg from '../../assets/icons/time.svg';
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
  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;
  const formattedTime = `${minutes}m ${seconds}s.`;

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
  const MIN_BONUS_PERCENTAGE = 70;
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
              <img
                src={tickImg}
                alt="tick"
                width={30}
                height={30}
                className={css.icon}
              />
            </span>
            You scored {accuracy}%!
          </div>
          <div className={css.description}>
            <span className={css.inlineBlock}>
              <img
                src={timeImg}
                alt="time"
                width={30}
                height={30}
                className={css.icon}
              />
            </span>
            Time : {formattedTime}
          </div>

          <div className={css.description}>
            <span className={css.inlineBlock}>
              <img src={tickImg} alt="tick" className={css.icon} />
            </span>
            <p className={css.description}>
              You answered {correctAnswersCount} out of {totalQuestions}{' '}
              questions correctly.
            </p>
          </div>

          <div className={css.description}>
            {correctAnswersCount === totalQuestions ? (
              <>
                <span className={css.inlineBlock}>
                  <img
                    src={cupImg}
                    alt="cup"
                    width={30}
                    height={30}
                    className={css.icon}
                  />
                </span>
                <p className={css.description}>
                  Perfect score! You nailed every question!
                </p>
              </>
            ) : showBonusButton ? (
              <>
                <span className={css.inlineBlock}>
                  <img
                    src={smileImg}
                    alt="smile"
                    width={30}
                    height={30}
                    className={css.icon}
                  />
                </span>
                <p className={css.description}>
                  Wonderful! Here is your bonus fact!
                </p>
              </>
            ) : (
              <>
                <span className={css.inlineBlock}>
                  <img
                    src={okImg}
                    alt="ok"
                    width={30}
                    height={30}
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
