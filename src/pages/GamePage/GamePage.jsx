// import { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import {
//   selectFilterCategory,
//   selectFilteredCards,
// } from '../../redux/filter/selectorsFilter.js';
// import {
//   selectCardsError,
//   selectCardsLoading,
// } from '../../redux/cards/selectorsCards.js';
// import { fetchCards } from '../../redux/cards/operationsCards';
// import { registerGameParticipant } from '../../redux/players/operationsPlayers';
// import { selectUser } from '../../redux/auth/selectorsAuth';
// import QuizeContainer from '../../components/QuizeContainer/QuizeContainer.jsx';
// import css from './GamePage.module.css';

// const GamePage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const selectedCategory = useSelector(selectFilterCategory);
//   const filteredQuestions = useSelector(selectFilteredCards);
//   const loading = useSelector(selectCardsLoading);
//   const error = useSelector(selectCardsError);
//   const currentUser = useSelector(selectUser);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [userAnswers, setUserAnswers] = useState([]);
//   const [startTime, setStartTime] = useState(null);

//   useEffect(() => {
//     if (selectedCategory && filteredQuestions.length === 0) {
//       dispatch(fetchCards());
//     }
//   }, [dispatch, selectedCategory, filteredQuestions.length]);

//   useEffect(() => {
//     setStartTime(Date.now());
//   }, []);

//   const currentQuestion = filteredQuestions[currentQuestionIndex];

//   const handleAnswer = answer => {
//     if (!currentQuestion) return;

//     const updatedAnswers = [...userAnswers];
//     updatedAnswers[currentQuestionIndex] = {
//       question: currentQuestion.question,
//       answer,
//       isCorrect: answer === currentQuestion.correctAnswer,
//     };

//     setUserAnswers(updatedAnswers);
//   };

//   const correctAnswersCount = userAnswers.filter(ans => ans?.isCorrect).length;

//   const handleNextQuestion = () => {
//     if (currentQuestionIndex < filteredQuestions.length - 1) {
//       setCurrentQuestionIndex(prev => prev + 1);
//     } else {
//       const timeTaken = Math.round((Date.now() - startTime) / 1000);

//       if (currentUser?.uid) {
//         dispatch(
//           registerGameParticipant({
//             cardId: selectedCategory,
//             userId: currentUser.uid,
//             category: selectedCategory,
//             timeTaken,
//             correctAnswersCount,
//           })
//         );
//       } else {
//         console.error('User not authenticated');
//       }

//       navigate('/result', {
//         state: { correctAnswersCount, category: selectedCategory, timeTaken },
//       });
//     }
//   };

//   return (
//     <div className={css.gamePage}>
//       <QuizeContainer>
//         {loading && <p>Loading questions...</p>}
//         {error && <p className={css.errorMessage}>Error: {error}</p>}
//         {!loading && !error && filteredQuestions.length === 0 && (
//           <p>No questions available for this category.</p>
//         )}
//         {!loading && !error && currentQuestion && (
//           <>
//             <h2>Category: {selectedCategory}</h2>
//             <p>
//               Question {currentQuestionIndex + 1} / {filteredQuestions.length}
//             </p>
//             <p>
//               Correct Answers: {correctAnswersCount} /{' '}
//               {filteredQuestions.length}
//             </p>
//             <p>{currentQuestion.question}</p>
//             <div className={css.answerButtons}>
//               {currentQuestion.options.map(option => (
//                 <button key={option} onClick={() => handleAnswer(option)}>
//                   {option}
//                 </button>
//               ))}
//             </div>
//             <button onClick={handleNextQuestion}>
//               {currentQuestionIndex === filteredQuestions.length - 1
//                 ? 'Submit'
//                 : 'Next'}
//             </button>
//           </>
//         )}
//       </QuizeContainer>
//     </div>
//   );
// };

// export default GamePage;
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  selectFilterCategory,
  selectFilteredCards,
} from '../../redux/filter/selectorsFilter.js';
import {
  selectCardsError,
  selectCardsLoading,
} from '../../redux/cards/selectorsCards.js';
import { fetchCards } from '../../redux/cards/operationsCards';
import { registerGameParticipant } from '../../redux/players/operationsPlayers';
import { selectUser } from '../../redux/auth/selectorsAuth';
import QuizeContainer from '../../components/QuizeContainer/QuizeContainer.jsx';
import CategoryCard from '../../components/CategoryCard/CategoryCard.jsx'; // Імпортуємо CategoryCard
import css from './GamePage.module.css';

const GamePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedCategory = useSelector(selectFilterCategory);
  const filteredQuestions = useSelector(selectFilteredCards);
  const loading = useSelector(selectCardsLoading);
  const error = useSelector(selectCardsError);
  const currentUser = useSelector(selectUser);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    if (selectedCategory && filteredQuestions.length === 0) {
      dispatch(fetchCards());
    }
  }, [dispatch, selectedCategory, filteredQuestions.length]);

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  const handleAnswer = answer => {
    if (!currentQuestion) return;

    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = {
      question: currentQuestion.question,
      answer,
      isCorrect: answer === currentQuestion.correctAnswer,
    };

    setUserAnswers(updatedAnswers);
  };

  const correctAnswersCount = userAnswers.filter(ans => ans?.isCorrect).length;

  const handleNextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      const timeTaken = Math.round((Date.now() - startTime) / 1000);

      if (currentUser?.uid) {
        dispatch(
          registerGameParticipant({
            cardId: selectedCategory,
            userId: currentUser.uid,
            category: selectedCategory,
            timeTaken,
            correctAnswersCount,
          })
        );
      } else {
        console.error('User not authenticated');
      }

      navigate('/result', {
        state: { correctAnswersCount, category: selectedCategory, timeTaken },
      });
    }
  };

  return (
    <div className={css.gamePage}>
      <QuizeContainer>
        {loading && <p>Loading questions...</p>}
        {error && <p className={css.errorMessage}>Error: {error}</p>}
        {!loading && !error && filteredQuestions.length === 0 && (
          <p>No questions available for this category.</p>
        )}
        {!loading && !error && currentQuestion && (
          <>
            <h2>Category: {selectedCategory}</h2>
            <p>
              Question {currentQuestionIndex + 1} / {filteredQuestions.length}
            </p>
            <p>
              Correct Answers: {correctAnswersCount} /{' '}
              {filteredQuestions.length}
            </p>

            <CategoryCard
              question={currentQuestion.question}
              options={currentQuestion.options}
              isLastQuestion={
                currentQuestionIndex === filteredQuestions.length - 1
              }
              onAnswer={handleAnswer}
              onNext={handleNextQuestion}
            />
          </>
        )}
      </QuizeContainer>
    </div>
  );
};

export default GamePage;
