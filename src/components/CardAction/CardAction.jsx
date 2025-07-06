import css from './CardAction.module.css';
import { useSelector } from 'react-redux'; // Імпортуємо useSelector для доступу до стану Redux
import { selectUser } from '../../redux/auth/selectorsAuth'; // Імпортуємо селектор для отримання поточного користувача

const CardAction = ({ card, onDelete, onEdit }) => {
  const currentUser = useSelector(selectUser);

  if (
    !card ||
    !card.isCustom ||
    !card.createdBy ||
    !currentUser ||
    card.createdBy !== currentUser.uid
  ) {
    return null;
  }

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

export default CardAction;
