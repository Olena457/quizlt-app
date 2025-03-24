import css from './PlayerItem.module.css';
import avatarUser from '../../assets/icons/avatarUser.svg';
import { useParams } from 'react-router-dom';

const PlayerItem = ({ cards }) => {
  const { cardId } = useParams();
  const card = cards.find(card => card.id === cardId);

  return (
    <div className={css.partCard}>
      <h2 className={css.title}>{card.title} Palayers</h2>
      {card.players &&
        Object.entries(card.players).map(([id, player]) => (
          <div key={id} className={css.iconParticipantWrapper}>
            <img
              src={avatarUser}
              aria-label="user avatar"
              alt="user avatar"
              className={css.participantAvatar}
            />
            <div className={css.partName}>{player.full_name}</div>
            <div className={css.partInfo}>
              <p className={css.partName}>{player.email}</p>
            </div>

            <div className={css.partInfo}>
              <p className={css.partName}>{player.category}</p>
            </div>
            <div className={css.partInfo}>
              <p className={css.partName}>{player.score}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PlayerItem;
