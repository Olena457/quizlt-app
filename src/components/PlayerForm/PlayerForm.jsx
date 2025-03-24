import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { registerParticipant } from '../../redux/cards/operationsCards.js';
import { selectIsLoggedIn } from '../../redux/auth/selectorsAuth.js';
import css from './PlayerForm.module.css';

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

  useEffect(() => {
    if (!isLoggedIn) {
      toast.info('Please log in to play the quiz!', { position: 'top-center' });
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const onSubmit = async data => {
    if (isSubmitted) return;
    setIsSubmitted(true);

    const isCorrect = data.answer === card.correctAnswer;
    const score = isCorrect ? 1 : 0;

    try {
      await dispatch(
        registerParticipant({
          fullname: 'User Name',
          email: 'user@example.com',
          category: card.category,
          cardID: card.id,
          question: card.questionText,
          answer: data.answer,
          score, // save score
        })
      );

      if (isCorrect) {
        toast.success('Correct answer! +1 score', { position: 'top-center' });
      } else {
        toast.error('Wrong answer. 0 score recorded.', {
          position: 'top-center',
        });
      }

      navigate('/cards'); // redirect to the card
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
      {isSubmitted && (
        <p className={css.message}>
          Your answer has been recorded. Returning to cards...
        </p>
      )}
    </div>
  );
};

export default PlayerForm;
