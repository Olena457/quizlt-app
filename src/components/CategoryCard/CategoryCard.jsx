import clsx from 'clsx';
import css from './CategoryCard.module.css';
// import CardActions from '../CardAction/CardAction.jsx';
import { useState } from 'react';

const CategoryCard = ({
  question,
  options,
  isLastQuestion,
  onAnswer,
  onNext,
  // card,
  // onEdit,
  // onDelete,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');

  return (
    <div className={css.containerQuize}>
      <div className={css.textQuestion}>{question}</div>
      <div className={css.containerButton}>
        {options.map((option, index) => (
          <button
            className={clsx(css.buttonQuestion, {
              [css.selected]: selectedAnswer === option,
            })}
            type="button"
            onClick={() => {
              setSelectedAnswer(option);
              onAnswer(option);
            }}
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
          type="submit"
          onClick={onNext}
        >
          {isLastQuestion ? 'Submit' : 'Next'}
        </button>
      </div>
      {/* <CardActions card={card}onEdit={onEdit} onDelete={onDelete} /> */}
    </div>
  );
};

export default CategoryCard;
