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
            <p className={css.participantName}>Name: {player.fullname}</p>
            <p className={css.participantEmail}>Email: {player.email}</p>
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

export default PlayerList;
