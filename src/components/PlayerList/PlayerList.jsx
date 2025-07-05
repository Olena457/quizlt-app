// import { memo } from 'react';
// import avatarUser from '../../assets/icons/avatarUser.svg';
// import css from './PlayerList.module.css';

// const PlayerList = ({ players }) => {
//   return (
//     <div className={css.participantList}>
//       {players.map(player => (
//         <div key={player.uid} className={css.participantCard}>
//           <img
//             src={avatarUser}
//             aria-label="user avatar"
//             alt="user avatar"
//             className={css.participantAvatar}
//           />
//           <div className={css.participantInfo}>
//             <p className={css.participantName}>
//               Name: {player.userName || 'Unknown'}
//             </p>
//             <p className={css.participantCategory}>
//               Category: {player.category}
//             </p>
//             <p className={css.participantScore}>Score: {player.score}</p>
//             {/* 'amount' може бути не завжди присутнім, тому перевіряємо його */}
//             {player.amount && (
//               <p className={css.participantQuestions}>
//                 Total Questions Answered: {player.amount}
//               </p>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default memo(PlayerList);

// src/components/PlayerList/PlayerList.jsx
import { memo } from 'react';
import avatarUser from '../../assets/icons/avatarUser.svg';
import css from './PlayerList.module.css';

const PlayerList = ({ players }) => {
  return (
    <div className={css.participantList}>
      {/* Кожен гравець тепер має унікальний 'userId' як ключ, оскільки ми зберігаємо лише останній результат */}
      {players.map(player => (
        <div key={player.userId} className={css.participantCard}>
          {' '}
          {/* ВИПРАВЛЕНО: Використовуємо player.userId як ключ */}
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
            <p className={css.participantQuestions}>
              Total Questions: {player.totalQuestions}
            </p>
            <p className={css.participantAccuracy}>
              Accuracy:{' '}
              {((player.score / player.totalQuestions) * 100).toFixed(1)}%
            </p>
            {player.timeTaken && (
              <p className={css.participantTime}>
                Time Taken: {player.timeTaken} seconds
              </p>
            )}
            {player.playedAt && (
              <p className={css.participantPlayedAt}>
                Played At: {new Date(player.playedAt).toLocaleString()}
              </p>
            )}
            <p className={css.participantUserId}>User ID: {player.userId}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(PlayerList);
