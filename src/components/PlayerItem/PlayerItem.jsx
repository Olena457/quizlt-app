import css from './PlayerItem.module.css';
import { useParams } from 'react-router-dom';

const PlayerItem = ({ cards }) => {
  const { cardId } = useParams();
  const card = cards.find(card => card.id === cardId);

  return (
    <div className={css.partCard}>
      <h2 className={css.title}>{card.title} Players</h2>
      {card.players &&
        Object.entries(card.players).map(([id, player]) => (
          <div key={id} className={css.partInfoWrapper}>
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
