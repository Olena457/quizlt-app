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
// import CategoryCard from '../../components/CategoryCard/CategoryCard.jsx';
// import css from './GamePage.module.css';
// import QuizeContainer from '../../components/QuizeContainer/QuizeContainer.jsx';

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
//         state: {
//           correctAnswersCount,
//           category: selectedCategory,
//           timeTaken,
//           totalQuestions: filteredQuestions.length,
//         },
//       });
//     }
//   };

//   return (
//     <div className={css.containerGame}>
//       <QuizeContainer>
//         {loading && <p>Loading questions...</p>}
//         {error && <p className={css.errorMessage}>Error: {error}</p>}
//         {!loading && !error && filteredQuestions.length === 0 && (
//           <p className={css.titleError}>
//             No questions available for this category.
//           </p>
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

//             <CategoryCard
//               question={currentQuestion.question}
//               options={currentQuestion.options}
//               isLastQuestion={
//                 currentQuestionIndex === filteredQuestions.length - 1
//               }
//               onAnswer={handleAnswer}
//               onNext={handleNextQuestion}
//               card={currentQuestion}
//             />
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
import { toast } from 'react-toastify'; // Додано імпорт toast

import //   selectFilterCategory, // <-- Ймовірно, буде замінено
//   selectFilteredCards, // <-- Ймовірно, буде замінено
'../../redux/filter/selectorsFilter.js';
import {
  selectCardsError,
  selectCardsLoading,
  selectSelectedCategoryQuestions, // <--- Важливо: додано імпорт нового селектора
  selectSelectedCategoryData, // <--- Важливо: додано імпорт нового селектора (якщо потрібні метадані)
} from '../../redux/cards/selectorsCards.js';
import { fetchCardByCategory } from '../../redux/cards/operationsCards'; // <--- Важливо: замінено fetchCards
import { registerGameParticipant } from '../../redux/players/operationsPlayers';
import { selectUser } from '../../redux/auth/selectorsAuth';
import CategoryCard from '../../components/CategoryCard/CategoryCard.jsx';
import css from './GamePage.module.css';
import QuizeContainer from '../../components/QuizeContainer/QuizeContainer.jsx';

const GamePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Оновлені селектори для отримання категорії та питань з sliceCards
  const selectedCategory = useSelector(selectSelectedCategoryData)?.name; // Або інший спосіб отримати назву категорії
  const filteredQuestions = useSelector(selectSelectedCategoryQuestions);

  const loading = useSelector(selectCardsLoading);
  const error = useSelector(selectCardsError);
  const currentUser = useSelector(selectUser); // Завжди залогінений користувач

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    // Якщо користувач залогінений, і вибрана категорія, завантажуємо питання
    // Використовуємо fetchCardByCategory для конкретної категорії
    if (selectedCategory && filteredQuestions.length === 0) {
      dispatch(fetchCardByCategory(selectedCategory)); // <--- Викликаємо правильний Thunk
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
      // Кінець гри, реєструємо результат
      const timeTaken = Math.round((Date.now() - startTime) / 1000);

      // Користувач завжди залогінений, тому перевірка if (currentUser?.uid) не потрібна
      dispatch(
        registerGameParticipant({
          userId: currentUser.uid, // UID гарантовано є
          category: selectedCategory,
          timeTaken,
          correctAnswersCount,
          totalQuestions: filteredQuestions.length,
        })
      );
      toast.success('Ваші результати збережено!'); // <--- Повідомлення про успішне збереження

      navigate('/result', {
        state: {
          correctAnswersCount,
          category: selectedCategory,
          timeTaken,
          totalQuestions: filteredQuestions.length,
        },
      });
    }
  };

  return (
    <div className={css.containerGame}>
      <QuizeContainer>
        {loading && <p>Завантаження питань...</p>}
        {error && <p className={css.errorMessage}>Помилка: {error}</p>}
        {!loading && !error && filteredQuestions.length === 0 && (
          <p className={css.titleError}>Для цієї категорії питань немає.</p>
        )}
        {!loading && !error && currentQuestion && (
          <>
            <h2>Категорія: {selectedCategory}</h2>
            <p>
              Питання {currentQuestionIndex + 1} / {filteredQuestions.length}
            </p>
            <p>
              Правильних відповідей: {correctAnswersCount} /{' '}
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
              card={currentQuestion}
            />
          </>
        )}
      </QuizeContainer>
    </div>
  );
};

export default GamePage;
