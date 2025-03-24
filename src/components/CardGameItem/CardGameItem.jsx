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
} from '../../redux/createCard/operationsCreateCard.js';
import { toast } from 'react-toastify';
import { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { full } from '../../assets/icons/full.svg';
import { empty } from '../../assets/icons/empty.svg';

export default function CardGameItem({ card }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userId = useSelector(selectUserId); // Отримуємо ID користувача
  const favoriteIndexes = useSelector(selectFavoritesIds);
  const [isLiked, setLiked] = useState(favoriteIndexes.includes(card.id));
  const [isEditing, setEditing] = useState(false); // Стан для редагування
  const [updatedCard, setUpdatedCard] = useState(card); // Для збереження змін

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
      // Перевірка на права власності
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
    } catch (error) {
      console.error('Error while deleting card:', error);
      toast.error('Error deleting card. Please try again later.', {
        position: 'top-center',
      });
    }
  };

  const handleEdit = async () => {
    if (card.creatorId !== userId) {
      // checked id creator
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

  const handleRegisterClick = () => {
    navigate(`/cards/${card.id}/register`);
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
      <button
        type="button"
        className={css.likeBtn}
        onClick={handleLike}
        aria-label="button like"
      >
        {isLiked ? (
          <img src={full} alt="full heart" className={css.heartIconFull} />
        ) : (
          <img src={empty} alt="empty heart" className={css.heartIcon} />
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
        <button onClick={handleRegisterClick} className={css.btn}>
          Play Game
        </button>
        <Link to={`/cards/${card.id}/players`} className={css.btn}>
          "Run Players"
        </Link>
        {isLoggedIn &&
          card.creatorId === userId && ( // display button
            <>
              {isEditing ? (
                <button onClick={handleEdit} className={css.saveBtn}>
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className={css.editBtn}
                >
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
