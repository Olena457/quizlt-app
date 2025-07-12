import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  addCustomCard,
  editCustomCard,
  fetchCustomCardById,
} from '../../redux/custom/operationsCustomCards.js';

import {
  selectSelectedCustomCard,
  selectCustomCardsLoading,
  selectCustomCardsError,
} from '../../redux/custom/selectorsCustomCards.js';

import { clearSelectedCustomCard } from '../../redux/custom/sliceCustomCards.js';
import { selectUserId } from '../../redux/auth/selectorsAuth.js';
import css from './CreateQuestionForm.module.css';

const CreateQuestionForm = () => {
  const { category: urlCategory, id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector(selectUserId);

  const cardToEdit = useSelector(selectSelectedCustomCard);
  const loading = useSelector(selectCustomCardsLoading);
  const error = useSelector(selectCustomCardsError);

  const [questionText, setQuestionText] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState([]);

  useEffect(() => {
    if (id && urlCategory) {
      dispatch(fetchCustomCardById({ category: urlCategory, id }));
    }
    return () => {
      dispatch(clearSelectedCustomCard());
    };
  }, [dispatch, id, urlCategory]);

  useEffect(() => {
    if (id && cardToEdit && cardToEdit.id === id) {
      setQuestionText(cardToEdit.question || '');
      setOption1(cardToEdit.options?.[0] || '');
      setOption2(cardToEdit.options?.[1] || '');
      setOption3(cardToEdit.options?.[2] || '');
      setOption4(cardToEdit.options?.[3] || '');
      setCorrectAnswers(cardToEdit.correctAnswers || []);
    }
  }, [id, cardToEdit, urlCategory]);

  const handleCheckboxChange = value => {
    setCorrectAnswers(prev =>
      prev.includes(value)
        ? prev.filter(ans => ans !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const allOptions = [option1, option2, option3, option4].map(opt =>
      opt.trim()
    );
    const isValid =
      questionText.trim() &&
      allOptions.every(opt => opt.length > 0) &&
      correctAnswers.length > 0;

    if (!isValid) {
      toast.error(
        'All fields are required, including at least one correct answer!',
        {
          position: 'top-center',
        }
      );
      return;
    }

    const cardData = {
      question: questionText.trim(),
      options: allOptions,
      correctAnswers,
      createdBy: userId,
    };

    try {
      if (id) {
        await dispatch(
          editCustomCard({
            category: urlCategory,
            id: id,
            updatedCard: cardData,
          })
        ).unwrap();
        toast.success('Question updated successfully!', {
          position: 'top-center',
        });
      } else {
        await dispatch(
          addCustomCard({ ...cardData, category: urlCategory.trim() })
        ).unwrap();
        toast.success('Question created successfully!', {
          position: 'top-center',
        });
      }
      navigate('/category');
    } catch (err) {
      toast.error(`An error occurred: ${err.message || 'Please try again.'}`, {
        position: 'top-center',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.formContainer}>
      <h2 className={css.title}>{id ? 'Edit Question' : 'Create Question'}</h2>
      <h4 className={css.subtitleContainer}>
        Category: <span className={css.categoryDisplay}>{urlCategory}</span>
      </h4>
      <label className={css.label}>
        Question:
        <textarea
          value={questionText}
          onChange={e => setQuestionText(e.target.value)}
          className={css.textarea}
        />
      </label>

      {[option1, option2, option3, option4].map((option, idx) => {
        const optionSetter = [setOption1, setOption2, setOption3, setOption4][
          idx
        ];
        return (
          <label key={idx} className={css.label}>
            Option {idx + 1}:
            <input
              type="text"
              value={option}
              onChange={e => optionSetter(e.target.value)}
              className={css.input}
            />
          </label>
        );
      })}

      <fieldset className={css.correctAnswerBox}>
        <legend className={css.choose}>Choose correct answer(s):</legend>
        {[option1, option2, option3, option4].map((option, idx) => (
          <label key={idx} className={css.checkboxLabel}>
            <input
              type="checkbox"
              value={option}
              checked={correctAnswers.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              disabled={!option.trim()}
            />
            {option || `Option ${idx + 1}`}
          </label>
        ))}
      </fieldset>

      <button type="submit" className={css.submitBtn} disabled={loading}>
        {loading
          ? id
            ? 'Updating...'
            : 'Creating...'
          : id
          ? 'Update Question'
          : 'Create Question'}
      </button>

      {loading && <p>Loading/Saving...</p>}
      {error && <p className={css.errorMessage}>Error: {error}</p>}
    </form>
  );
};

export default CreateQuestionForm;
