import css from './CardActions.module.css';

const CardActions = ({ card, onDelete, onEdit }) => {
  if (!card || !card.creatorId) return null;

  return (
    <div className={css.actions}>
      <button onClick={() => onEdit(card)} className={css.edit}>
        ✏️ edit
      </button>
      <button onClick={() => onDelete(card)} className={css.delete}>
        🗑 delete
      </button>
    </div>
  );
};

export default CardActions;
