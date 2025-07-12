import { useState } from 'react';
import clsx from 'clsx';
import CardActions from '../CardAction/CardAction.jsx';
import css from './CategoryCard.module.css';

const CategoryCard = ({
  question,
  options,
  isLastQuestion,
  onAnswer,
  onNext,
  questionData, //data for the question
  onEdit,
  onDelete,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const toggleAnswer = option => {
    setSelectedAnswers(prev =>
      prev.includes(option)
        ? prev.filter(ans => ans !== option)
        : [...prev, option]
    );
  };

  const handleNextClick = () => {
    onAnswer(selectedAnswers);
    onNext();
    setSelectedAnswers([]);
  };

  return (
    <div className={css.containerQuize}>
      <div className={css.textQuestion}>{question}</div>

      <div className={css.containerButton}>
        {options.map((option, index) => (
          <button
            className={clsx(css.buttonQuestion, {
              [css.selected]: selectedAnswers.includes(option),
            })}
            type="button"
            onClick={() => toggleAnswer(option)}
            key={index}
          >
            {option}
          </button>
        ))}
      </div>

      <div className={css.containerBtnNext}>
        <button
          className={clsx(css.buttonNext, {
            [css.submitButton]: isLastQuestion,
          })}
          type="button"
          onClick={handleNextClick}
          disabled={selectedAnswers.length === 0}
        >
          {isLastQuestion ? 'Result' : 'Next'}
        </button>
      </div>

      <CardActions card={questionData} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
};

export default CategoryCard;
