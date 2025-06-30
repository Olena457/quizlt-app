// import css from './PlayerItem.module.css';
// import { useParams } from 'react-router-dom';

// const PlayerItem = ({ cards }) => {
//   const { cardId } = useParams();
//   const card = cards.find(card => card.id === cardId);

//   return (
//     <div className={css.partCard}>
//       <h2 className={css.title}>{card.title} Players</h2>
//       {card.players &&
//         Object.entries(card.players).map(([id, player]) => (
//           <div key={id} className={css.partInfoWrapper}>
//             <div className={css.partName}>
//               Name:
//               {player.full_name || player.name}
//             </div>

//             <div className={css.partInfo}>
//               <p className={css.partName}>Category: {player.category}</p>
//             </div>
//             <div className={css.partInfo}>
//               <p className={css.partName}>Score: {player.score}</p>
//             </div>
//             <div className={css.partInfo}>
//               <p className={css.partName}>
//                 Total Questions Answered: {player.amount}
//               </p>
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default PlayerItem;
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
            <div className={css.partName}>
              Name: {player.fullName || player.name || 'Unknown'}
            </div>
            <div className={css.partInfo}>
              <p className={css.partName}>Category: {player.category}</p>
            </div>
            <div className={css.partInfo}>
              <p className={css.partName}>
                Correct Answers: {player.score} / {player.totalQuestions}
              </p>
            </div>
            <div className={css.partInfo}>
              <p className={css.partName}>
                Accuracy:
                {((player.score / player.totalQuestions) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PlayerItem;
