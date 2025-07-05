import { memo } from 'react';
// import avatarUser from '../../assets/icons/avatarUser.svg';
import css from './PlayerList.module.css';

const PlayerList = ({ players }) => {
  return (
    <div className={css.participantList}>
      {players.map(player => (
        <div key={player.userId} className={css.participantCard}>
          <div className={css.participantInfo}>
            <p className={css.participantName}>
              Name: {player.userName || 'Unknown'}
            </p>
            <p className={css.participantCategory}>
              Category: {player.category}
            </p>
            <p className={css.participantQuestions}>
              Total Questions: {player.totalQuestions}
            </p>
            <p className={css.participantScore}>Score: {player.score}</p>
            {/* <p className={css.participantAccuracy}>
              Accuracy:{' '}
              {((player.score / player.totalQuestions) * 100).toFixed(1)}%
            </p> */}
            {player.timeTaken && (
              <p className={css.participantTime}>
                Time: {player.timeTaken} seconds
              </p>
            )}
            {player.playedAt && (
              <p className={css.participantPlayedAt}>
                Played At: {new Date(player.playedAt).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(PlayerList);
