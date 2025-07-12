import { memo } from 'react';
import cupImg from '../../assets/icons/cup.svg';
import css from './PlayerList.module.css';

const PlayerList = ({ players }) => {
  return (
    <div className={css.participantList}>
      {players.map(player => (
        <div key={player.userId} className={css.participantCard}>
          <div className={css.participantInfo}>
            <div className={css.titleWithLogo}>
              <div className={css.logoContainer}>
                <img
                  src={cupImg}
                  alt="cup"
                  width={20}
                  height={20}
                  className={css.svgLayer}
                />
              </div>
              <p className={css.participantName}>
                Name: {player.userName || 'Unknown'}
              </p>
            </div>

            <p className={css.participantCategory}>
              Category: {player.category}
            </p>
            <p className={css.participantQuestions}>
              Total Questions: {player.totalQuestions}
            </p>
            <p className={css.participantScore}>Score: {player.score}</p>

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
