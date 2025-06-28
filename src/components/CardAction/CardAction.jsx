// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteCustomCard } from '../../redux/custom/operationsCustomCards.js';
// import css from './CardActions.module.css';
// import { selectUserId } from '../../redux/auth/selectorsAuth.js';

// const CardActions = ({ card }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const currentUserId = useSelector(selectUserId);

//   if (!card || !card.creatorId || card.creatorId !== currentUserId) {
//     return null;
//   }
//   const handleEdit = () => {
//     navigate(`/edit-question/${card.category}/${card.id}`);
//   };

//   const handleDelete = () => {
//     const confirmed = window.confirm(
//       'Are you sure you want to delete the question?'
//     );
//     if (confirmed) {
//       dispatch(deleteCustomCard({ category: card.category, id: card.id }));
//     }
//   };

//   return (
//     <div className={css.actions}>
//       <button onClick={handleEdit} className={css.edit}>
//         ✏️ edit
//       </button>
//       <button onClick={handleDelete} className={css.delete}>
//         🗑 delit
//       </button>
//     </div>
//   );
// };

// export default CardActions;
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
