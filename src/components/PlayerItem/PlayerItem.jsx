// import { useParams } from 'react-router-dom';
// import css from './PlayerItem.module.css';

// const PlayerItem = ({ categoryQuestions }) => {
//   const { cardId } = useParams();
//   const question = categoryQuestions.find(item => item.id === cardId);

//   return (
//     <div className={css.partCard}>
//       <h2 className={css.title}>{question.title} Players</h2>
//       {question.players &&
//         Object.entries(question.players).map(([uid, player]) => (
//           <div key={uid} className={css.partInfoWrapper}>
//             <div className={css.partName}>
//               Name: {player.userName || 'Unknown'}
//             </div>
//             <div className={css.partInfo}>
//               <p className={css.partName}>Category: {player.category}</p>
//             </div>
//             <div className={css.partInfo}>
//               <p className={css.partName}>
//                 Correct Answers: {player.score} / {player.totalQuestions}
//               </p>
//             </div>
//             <div className={css.partInfo}>
//               <p className={css.partName}>
//                 Accuracy:
//                 {((player.score / player.totalQuestions) * 100).toFixed(1)}%
//               </p>
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default PlayerItem;
