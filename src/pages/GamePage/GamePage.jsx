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
import { toast } from 'react-toastify';

import {
  selectCardsError,
  selectCardsLoading,
  selectSelectedCategoryQuestions,
  selectSelectedCategoryData,
} from '../../redux/cards/selectorsCards.js';
import { fetchCardByCategory } from '../../redux/cards/operationsCards.js';
import { registerGameParticipant } from '../../redux/players/operationsPlayers.js';
import { selectUser } from '../../redux/auth/selectorsAuth.js';
import { deleteCustomCard } from '../../redux/customCards/operationsCustomCards.js';

import CategoryCard from '../../components/CategoryCard/CategoryCard.jsx';
import QuizeContainer from '../../components/QuizeContainer/QuizeContainer.jsx';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal.jsx';

import css from './GamePage.module.css';

const GamePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedCategory = useSelector(selectSelectedCategoryData)?.name;
  const filteredQuestions = useSelector(selectSelectedCategoryQuestions);
  const loading = useSelector(selectCardsLoading);
  const error = useSelector(selectCardsError);
  const currentUser = useSelector(selectUser);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [startTime, setStartTime] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);

  useEffect(() => {
    if (selectedCategory && filteredQuestions.length === 0) {
      dispatch(fetchCardByCategory(selectedCategory));
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

      dispatch(
        registerGameParticipant({
          userId: currentUser.uid,
          category: selectedCategory,
          timeTaken,
          correctAnswersCount,
          totalQuestions: filteredQuestions.length,
        })
      );
      toast.success('Your results have been saved!');

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

  const openDeleteModal = card => {
    setCardToDelete(card);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (cardToDelete) {
      try {
        await dispatch(
          deleteCustomCard({
            category: cardToDelete.category,
            id: cardToDelete.id,
          })
        ).unwrap();

        toast.info('The question was deleted.');

        // ⚠️ Якщо було видалено останнє питання в категорії
        const newLength = filteredQuestions.length - 1;

        if (newLength === 0) {
          navigate('/'); // або показати "питань немає", як захочеш
          return;
        }

        // ⚙️ Оновлюємо список після видалення
        dispatch(fetchCardByCategory(cardToDelete.category));

        // Зменшуємо currentQuestionIndex, якщо потрібно
        setCurrentQuestionIndex(prev =>
          prev >= newLength ? newLength - 1 : prev
        );
      } catch (error) {
        console.error('Delete failed:', error);
        toast.error('Failed to delete the question.');
      }
    }

    setShowModal(false);
    setCardToDelete(null);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setCardToDelete(null);
  };

  return (
    <div className={css.containerGame}>
      <QuizeContainer>
        {loading && <p>loading questions...</p>}
        {error && <p className={css.errorMessage}>Error: {error}</p>}
        {!loading && !error && filteredQuestions.length === 0 && (
          <p className={css.titleError}>
            No questions available for this category.
          </p>
        )}
        {!loading && !error && currentQuestion && (
          <>
            <h2>Category: {selectedCategory}</h2>
            <p>
              Question {currentQuestionIndex + 1} / {filteredQuestions.length}
            </p>
            <p>
              Correct answers: {correctAnswersCount} /{' '}
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
              onDelete={openDeleteModal}
              onEdit={card =>
                navigate(`/edit-question/${card.category}/${card.id}`)
              }
            />
          </>
        )}
        <ConfirmModal
          isOpen={showModal}
          message="Are you sure you want to delete this question?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      </QuizeContainer>
    </div>
  );
};

export default GamePage;
