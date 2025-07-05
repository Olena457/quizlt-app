import { memo } from 'react';
import avatarUser from '../../assets/icons/avatarUser.svg';
import css from './PlayerList.module.css';

const PlayerList = ({ players }) => {
  return (
    <div className={css.participantList}>
      {players.map(player => (
        <div key={player.id} className={css.participantCard}>
          <img
            src={avatarUser}
            aria-label="user avatar"
            alt="user avatar"
            className={css.participantAvatar}
          />
          <div className={css.participantInfo}>
            <p className={css.participantName}>
              Name: {player.userName || 'Unknown'}
            </p>
            <p className={css.participantCategory}>
              Category: {player.category}
            </p>
            <p className={css.participantScore}>Score: {player.score}</p>
            {player.amount && (
              <p className={css.participantQuestions}>
                Total Questions Answered: {player.amount}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(PlayerList);
