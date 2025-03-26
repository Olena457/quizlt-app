// import css from './CardGameItem.module.css';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   selectIsLoggedIn,
//   selectUserId,
// } from '../../redux/auth/selectorsAuth.js';
// import { selectFavoritesIds } from '../../redux/favorites/selectorsFavorites.js';
// import { toggleFavorite } from '../../redux/favorites/operationsFavorites.js';
// import {
//   deleteCard,
//   editCard,
// } from '../../redux/createCard/operationsCreteCard.js';
// import { toast } from 'react-toastify';
// import { useState, useCallback } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import fullHeart from '../../assets/icons/fullHeart.svg';
// import emptyHeart from '../../assets/icons/emptyHeart.svg';

// export default function CardGameItem({ card }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const isLoggedIn = useSelector(selectIsLoggedIn);
//   const userId = useSelector(selectUserId);
//   const favoriteIndexes = useSelector(selectFavoritesIds);
//   const [isLiked, setLiked] = useState(favoriteIndexes.includes(card.id));
//   const [isEditing, setEditing] = useState(false);
//   const [updatedCard, setUpdatedCard] = useState(card);

//   const { title, questionText, category } = card;

//   const handleLike = useCallback(() => {
//     if (!isLoggedIn) {
//       toast.info('Login first to save favorites!', {
//         position: 'top-center',
//       });
//     } else {
//       setLiked(prev => !prev);
//       dispatch(toggleFavorite(card));
//     }
//   }, [isLoggedIn, dispatch, card]);

//   const handleDelete = async () => {
//     if (card.creatorId !== userId) {
//       toast.error('You can only delete your own cards!', {
//         position: 'top-center',
//       });
//       return;
//     }
//     try {
//       await dispatch(deleteCard(card.id)).unwrap();
//       toast.success('Card deleted successfully!', {
//         position: 'top-center',
//       });
//     } catch {
//       toast.error('Error deleting card. Please try again later.', {
//         position: 'top-center',
//       });
//     }
//   };

//   const handleEdit = async () => {
//     if (card.creatorId !== userId) {
//       toast.error('You can only edit your own cards!', {
//         position: 'top-center',
//       });
//       return;
//     }
//     try {
//       await dispatch(editCard({ id: card.id, updatedCard })).unwrap();
//       toast.success('Card updated successfully!', {
//         position: 'top-center',
//       });
//       setEditing(false);
//     } catch (error) {
//       console.error('Error while updating card:', error);
//       toast.error('Error updating card. Please try again later.', {
//         position: 'top-center',
//       });
//     }
//   };

//   const handleRegisterClick = () => {
//     // Перевірка, чи користувач залогінений
//     if (!isLoggedIn) {
//       toast.info('Login first to play game!', {
//         position: 'top-center',
//       });
//       navigate('/login');
//     } else {
//       navigate(`/cards/${card.id}/register`);
//     }
//   };

//   const handleInputChange = e => {
//     const { name, value } = e.target;
//     setUpdatedCard(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className={css.cardContainer}>
//       <div className={css.imageContainer}>
//         <div className={css.cardImage}></div>
//       </div>
//       <button
//         type="button"
//         className={css.likeBtn}
//         onClick={handleLike}
//         aria-label="button like"
//       >
//         {isLiked ? (
//           <img
//             src={fullHeart}
//             width="16"
//             height="16"
//             alt="full heart"
//             className={css.heartIconFull}
//           />
//         ) : (
//           <img
//             src={emptyHeart}
//             width="16"
//             height="16"
//             alt="empty heart"
//             className={css.heartIcon}
//           />
//         )}
//       </button>
//       <div className={css.cardInfoTitle}>
//         {isEditing ? (
//           <input
//             type="text"
//             name="title"
//             value={updatedCard.title}
//             onChange={handleInputChange}
//             className={css.inputField}
//           />
//         ) : (
//           <h3 className={css.cardName}>{title}</h3>
//         )}
//       </div>
//       <div className={css.cardInfo}>
//         {isEditing ? (
//           <textarea
//             name="questionText"
//             value={updatedCard.questionText}
//             onChange={handleInputChange}
//             className={css.textArea}
//           />
//         ) : (
//           <p className={css.cardDescription}>{questionText}</p>
//         )}
//       </div>
//       <div className={css.organizerTextContainer}>
//         <p className={css.label}>Category:</p>
//         {isEditing ? (
//           <input
//             type="text"
//             name="category"
//             value={updatedCard.category}
//             onChange={handleInputChange}
//             className={css.inputField}
//           />
//         ) : (
//           <p className={css.cardNameOrg}>{category}</p>
//         )}
//       </div>
//       <div className={css.btnContainer}>
//         <button onClick={handleRegisterClick} className={css.btnGame}>
//           Play Game
//         </button>
//         <Link to={`/cards/${card.id}/players`} className={css.btnGame}>
//           Run Players
//         </Link>
//         {isLoggedIn && card.creatorId === userId && (
//           <>
//             {isEditing ? (
//               <button onClick={handleEdit} className={css.saveBtn}>
//                 Save
//               </button>
//             ) : (
//               <button onClick={() => setEditing(true)} className={css.editBtn}>
//                 Edit
//               </button>
//             )}
//             <button onClick={handleDelete} className={css.deleteBtn}>
//               Delete
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
import css from './CardGameItem.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectIsLoggedIn,
  selectUserId,
} from '../../redux/auth/selectorsAuth.js';
import { selectFavoritesIds } from '../../redux/favorites/selectorsFavorites.js';
import { toggleFavorite } from '../../redux/favorites/operationsFavorites.js';
import {
  deleteCard,
  editCard,
} from '../../redux/createCard/operationsCreteCard.js';
import { toast } from 'react-toastify';
import { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import fullHeart from '../../assets/icons/fullHeart.svg';
import emptyHeart from '../../assets/icons/emptyHeart.svg';
import { registerGameParticipant } from '../../redux/players/operationsPlayers'; // Імпорт дії реєстрації

export default function CardGameItem({ card }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userId = useSelector(selectUserId);
  const favoriteIndexes = useSelector(selectFavoritesIds);
  const [isLiked, setLiked] = useState(favoriteIndexes.includes(card.id));
  const [isEditing, setEditing] = useState(false);
  const [updatedCard, setUpdatedCard] = useState(card);

  const { title, questionText, category } = card;

  const handleLike = useCallback(() => {
    if (!isLoggedIn) {
      toast.info('Login first to save favorites!', {
        position: 'top-center',
      });
    } else {
      setLiked(prev => !prev);
      dispatch(toggleFavorite(card));
    }
  }, [isLoggedIn, dispatch, card]);

  const handleDelete = async () => {
    if (card.creatorId !== userId) {
      toast.error('You can only delete your own cards!', {
        position: 'top-center',
      });
      return;
    }
    try {
      await dispatch(deleteCard(card.id)).unwrap();
      toast.success('Card deleted successfully!', {
        position: 'top-center',
      });
    } catch {
      toast.error('Error deleting card. Please try again later.', {
        position: 'top-center',
      });
    }
  };

  const handleEdit = async () => {
    if (card.creatorId !== userId) {
      toast.error('You can only edit your own cards!', {
        position: 'top-center',
      });
      return;
    }
    try {
      await dispatch(editCard({ id: card.id, updatedCard })).unwrap();
      toast.success('Card updated successfully!', {
        position: 'top-center',
      });
      setEditing(false);
    } catch (error) {
      console.error('Error while updating card:', error);
      toast.error('Error updating card. Please try again later.', {
        position: 'top-center',
      });
    }
  };

  const handlePlayGameClick = () => {
    if (!isLoggedIn || !userId) {
      toast.info('Login first to play game!', { position: 'top-center' });
      navigate('/login');
      return;
    }
    dispatch(registerGameParticipant({ cardId: card.id, userId }))
      .unwrap()
      .then(() => {
        toast.success('Ви готові до гри!'); // Повідомлення про готовність
        // Перенаправляємо на сторінку з детальною інформацією про картку
        navigate(`/cards/${card.id}`);
      })
      .catch(error => {
        toast.error(`Error registering for the game: ${error}`);
      });
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setUpdatedCard(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={css.cardContainer}>
      <div className={css.imageContainer}>
        <div className={css.cardImage}></div>
      </div>
      <button
        type="button"
        className={css.likeBtn}
        onClick={handleLike}
        aria-label="button like"
      >
        {isLiked ? (
          <img
            src={fullHeart}
            width="16"
            height="16"
            alt="full heart"
            className={css.heartIconFull}
          />
        ) : (
          <img
            src={emptyHeart}
            width="16"
            height="16"
            alt="empty heart"
            className={css.heartIcon}
          />
        )}
      </button>
      <div className={css.cardInfoTitle}>
        {isEditing ? (
          <input
            type="text"
            name="title"
            value={updatedCard.title}
            onChange={handleInputChange}
            className={css.inputField}
          />
        ) : (
          <h3 className={css.cardName}>{title}</h3>
        )}
      </div>
      <div className={css.cardInfo}>
        {isEditing ? (
          <textarea
            name="questionText"
            value={updatedCard.questionText}
            onChange={handleInputChange}
            className={css.textArea}
          />
        ) : (
          <p className={css.cardDescription}>{questionText}</p>
        )}
      </div>
      <div className={css.organizerTextContainer}>
        <p className={css.label}>Category:</p>
        {isEditing ? (
          <input
            type="text"
            name="category"
            value={updatedCard.category}
            onChange={handleInputChange}
            className={css.inputField}
          />
        ) : (
          <p className={css.cardNameOrg}>{category}</p>
        )}
      </div>
      <div className={css.btnContainer}>
        <button onClick={handlePlayGameClick} className={css.btnGame}>
          Play Game
        </button>
        <Link to={`/cards/${card.id}/players`} className={css.btnGame}>
          View Players
        </Link>
        {isLoggedIn && card.creatorId === userId && (
          <>
            {isEditing ? (
              <button onClick={handleEdit} className={css.saveBtn}>
                Save
              </button>
            ) : (
              <button onClick={() => setEditing(true)} className={css.editBtn}>
                Edit
              </button>
            )}
            <button onClick={handleDelete} className={css.deleteBtn}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
