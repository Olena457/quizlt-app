import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  selectCategoriesError,
  selectCategoriesLoading,
  selectSelectedCategoryQuestions,
} from '../../redux/categories/selectorsCategories.js';

import { fetchQuizzesByCategory } from '../../redux/categories/operationsCategories.js';
import { registerGameParticipant } from '../../redux/players/operationsPlayers.js';
import { selectUser } from '../../redux/auth/selectorsAuth.js';
import { deleteCustomCard } from '../../redux/custom/operationsCustomCards.js';

import CategoryCard from '../../components/CategoryCard/CategoryCard.jsx';
import QuizeContainer from '../../components/QuizeContainer/QuizeContainer.jsx';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal.jsx';
import css from './GamePage.module.css';

const GamePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const selectedCategory = location.state?.categoryName;

  const filteredQuestions = useSelector(selectSelectedCategoryQuestions);
  const loading = useSelector(selectCategoriesLoading);
  const error = useSelector(selectCategoriesError);
  const currentUser = useSelector(selectUser);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [startTime, setStartTime] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);

  useEffect(() => {
    if (selectedCategory && filteredQuestions.length === 0) {
      dispatch(fetchQuizzesByCategory(selectedCategory));
    }
  }, [dispatch, selectedCategory, filteredQuestions.length]);

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  const handleAnswer = answer => {
    if (!currentQuestion) return;

    const correct = (currentQuestion.correctAnswers || []).slice().sort();
    const selected = answer.slice().sort();

    const isCorrect =
      correct.length === selected.length &&
      correct.every((val, idx) => val === selected[idx]);

    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = {
      question: currentQuestion.question,
      answer: selected,
      isCorrect,
    };

    setUserAnswers(updatedAnswers);
  };

  const correctAnswersCount = userAnswers.filter(ans => ans?.isCorrect).length;

  const handleNextQuestion = () => {
    if (!currentUser) {
      toast.error('User not found. Please log in again.');
      navigate('/login');
      return;
    }

    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      const timeTaken = Math.round((Date.now() - startTime) / 1000);

      dispatch(
        registerGameParticipant({
          userId: currentUser.uid,
          category: selectedCategory, // <--- Using `selectedCategory` from `location.state`
          timeTaken,
          correctAnswersCount,
          totalQuestions: filteredQuestions.length,
        })
      );

      toast.success('Your results have been saved!');

      navigate('/result', {
        state: {
          correctAnswersCount,
          category: selectedCategory, // <--- Using `selectedCategory` from `location.state`
          timeTaken,
          totalQuestions: filteredQuestions.length,
        },
      });
    }
  };

  // opening the delete modal
  const openDeleteModal = question => {
    setQuestionToDelete(question);
    setShowModal(true);
  };

  //  confirming question deletion
  const confirmDelete = async () => {
    if (questionToDelete) {
      try {
        await dispatch(
          deleteCustomCard({
            category: questionToDelete.category,
            id: questionToDelete.id,
          })
        ).unwrap();

        toast.info('The question was deleted.');

        const newLength = filteredQuestions.length - 1;

        if (newLength === 0) {
          navigate('/categories');
          return;
        }

        dispatch(fetchQuizzesByCategory(questionToDelete.category));

        setCurrentQuestionIndex(prev =>
          prev >= newLength ? newLength - 1 : prev
        );
      } catch (error) {
        console.error('Delete failed:', error);
        toast.error('Failed to delete the question.');
      }
    }

    setShowModal(false);
    setQuestionToDelete(null);
  };

  // Handler for canceling deletion
  const cancelDelete = () => {
    setShowModal(false);
    setQuestionToDelete(null);
  };

  return (
    <div className={css.pageGame}>
      <div className={css.containerGame}>
        <QuizeContainer>
          {loading && <p>Loading questions...</p>}
          {error && <p className={css.errorMessage}>Error: {error}</p>}

          {!loading && !error && filteredQuestions.length === 0 && (
            <p className={css.titleError}>
              No questions available for this category.
            </p>
          )}

          {!loading && !error && currentQuestion && (
            <>
              <h2 className={css.pageTitle}>Category: {selectedCategory}</h2>
              <p className={css.questionCount}>
                Question {currentQuestionIndex + 1} / {filteredQuestions.length}
              </p>
              {/* <p>
                Correct Answers: {correctAnswersCount} /
                {filteredQuestions.length}
              </p> */}
              <CategoryCard
                question={currentQuestion.question}
                options={currentQuestion.options}
                isLastQuestion={
                  currentQuestionIndex === filteredQuestions.length - 1
                }
                onAnswer={handleAnswer}
                onNext={handleNextQuestion}
                questionData={currentQuestion}
                onDelete={openDeleteModal}
                onEdit={question =>
                  navigate(`/edit-question/${question.category}/${question.id}`)
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
    </div>
  );
};

export default GamePage;

// const handleAnswer = answer => {
//   if (!currentQuestion) return;

//   const updatedAnswers = [...userAnswers];
//   updatedAnswers[currentQuestionIndex] = {
//     question: currentQuestion.question,
//     answer,
//     isCorrect: answer === currentQuestion.correctAnswer,
//   };

//   setUserAnswers(updatedAnswers);
// };
