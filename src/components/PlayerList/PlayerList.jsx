import css from './PlayerList.module.css';
import avatarUser from '../../assets/icons/avatarUser.svg';

const PlayerList = ({ players }) => {
  return (
    <div className={css.participantList}>
      {players.map(player => (
        <div key={player.email} className={css.participantCard}>
          <img
            src={avatarUser}
            aria-label="user avatar"
            alt="user avatar"
            className={css.participantAvatar}
          />
          <div className={css.participantInfo}>
            <p className={css.participantName}>{player.fullname}</p>
            <p className={css.participantEmail}>{player.email}</p>
            <p className={css.participantScore}>{player.category}</p>
            <p className={css.participantScore}>{player.score}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerList;
