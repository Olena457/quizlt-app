import React, { memo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { registerParticipant } from '../../redux/cards/operationsCards.js';
import { selectIsLoggedIn } from '../../redux/auth/selectorsAuth.js';
import css from './PlayerForm.module.css';
import { getDatabase, ref, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const PlayerForm = ({ card, category }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0); // Track total answered questions
  const [userData, setUserData] = useState({ fullname: '', email: '' });

  useEffect(() => {
    if (!isLoggedIn) {
      toast.info('Please log in to play the quiz!', { position: 'top-center' });
      navigate('/login');
    } else {
      const fetchUserData = async () => {
        try {
          const auth = getAuth(); // Get Firebase Authentication instance
          const user = auth.currentUser; // Get currently authenticated user

          if (user) {
            const userUid = user.uid; // Get the UID of the user
            const database = getDatabase();
            const userRef = ref(database, `users/${userUid}`);
            const snapshot = await get(userRef);

            if (snapshot.exists()) {
              setUserData(snapshot.val()); // Load user data (fullname, email)
            } else {
              toast.error('User data not found!', { position: 'top-center' });
            }
          } else {
            toast.error('No authenticated user found!', {
              position: 'top-center',
            });
          }
        } catch {
          toast.error('Failed to fetch user data!', { position: 'top-center' });
        }
      };

      fetchUserData();
    }
  }, [isLoggedIn, navigate]);

  const onSubmit = async data => {
    if (isSubmitted) return;
    setIsSubmitted(true);

    const isCorrect = data.answer === card.correctAnswer;
    const score = isCorrect ? 1 : 0;

    try {
      setTotalQuestions(prev => prev + 1);

      await dispatch(
        registerParticipant({
          fullname: userData.fullname,
          email: userData.email,
          category: card.category,
          cardID: card.id,
          question: card.questionText,
          answer: data.answer,
          amount: totalQuestions + 1,
          score,
        })
      );

      if (isCorrect) {
        toast.success('Correct answer! +1 score', { position: 'top-center' });
      } else {
        toast.error('Wrong answer. 0 score recorded.', {
          position: 'top-center',
        });
      }

      navigate('/cards'); // Redirect to the card
    } catch {
      toast.error('Error while submitting your answer. Try again!', {
        position: 'top-center',
      });
      setIsSubmitted(false);
    }
  };

  return (
    <div className={css.container}>
      <h3 className={css.title}>Category: {category}</h3>
      <p className={css.question}>{card.questionText}</p>

      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <fieldset className={css.fieldset} disabled={isSubmitted}>
          <legend className={css.legend}>Choose your answer:</legend>
          {card.options.map((option, index) => (
            <div key={index} className={css.radioWrapper}>
              <input
                {...register('answer', { required: true })}
                type="radio"
                value={option}
                id={`option-${index}`}
                className={css.radio}
              />
              <label htmlFor={`option-${index}`} className={css.label}>
                {option}
              </label>
            </div>
          ))}
        </fieldset>
        {errors.answer && <p className={css.error}>Please select an answer.</p>}

        <button type="submit" className={css.submitBtn} disabled={isSubmitted}>
          Submit Answer
        </button>
      </form>

      <div className={css.stats}>
        <p>Total Questions Answered: {totalQuestions}</p>
      </div>

      {isSubmitted && (
        <p className={css.message}>
          Your answer has been recorded. Returning to cards...
        </p>
      )}
    </div>
  );
};

export default memo(PlayerForm);
