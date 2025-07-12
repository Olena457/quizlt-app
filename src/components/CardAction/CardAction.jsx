import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectorsAuth';
import css from './CardAction.module.css';

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
        Edit
      </button>
      <button onClick={() => onDelete(card)} className={css.delete}>
        Delete
      </button>
    </div>
  );
};

export default CardAction;
