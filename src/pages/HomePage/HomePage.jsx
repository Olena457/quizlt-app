// // import { NavLink } from 'react-router-dom';
// // import CubeGallery from '../../components/CubeGallery/CubeGallery.jsx';
// // import css from './HomePage.module.css';

// // const HomePage = () => {
// //   return (
// //     <div className={css.containerHome}>
// //       <div className={css.introBlock}>
// //         <h1 className={css.title}>Quizlet Game</h1>
// //         <div className={css.containerWelcome}>
// //           <h3 className={css.subtitle}>
// //             Dive into the quiz and see how much you know!
// //           </h3>
// //           <div className={css.buttonWrapper}>
// //             <NavLink to="/start" className={css.buttonHome}>
// //               begin
// //             </NavLink>
// //           </div>
// //         </div>

// //         <div className="cubeBlock">
// //           <CubeGallery />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default HomePage;
// import { NavLink } from 'react-router-dom';

// import CubeGallery from '../../components/CubeGallery/CubeGallery.jsx';

// import css from './HomePage.module.css';

// const HomePage = () => {
//   return (
//     <div className={css.containerPage}>
//       <div className={css.containerHome}>
//         <div className={css.introBlock}>
//           <h1 className={css.title}>Quizlet Game</h1>
//           <div className={css.containerWelcome}>
//             <div className={css.buttonWrapper}>
//               <NavLink to="/start" className={css.buttonHome}>
//                 start
//               </NavLink>
//             </div>
//           </div>
//           <h3 className={css.subtitle}>
//             Dive into the quiz and see how much you know!
//           </h3>
//         </div>
//         <div className="cubeBlock">
//           <CubeGallery />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;
// HomePage.jsx
import { NavLink } from 'react-router-dom';
import CubeGallery from '../../components/CubeGallery/CubeGallery.jsx';
import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={css.containerPage}>
      <div className={css.containerHome}>
        <div className={css.introBlock}>
          <div className={css.titleAndButtonWrapper}>
            <h1 className={css.title}>Quizlet Game</h1>
            <div className={css.buttonWrapper}>
              <NavLink to="/start" className={css.buttonHome}>
                start
              </NavLink>
            </div>
          </div>
          {/* <h3 className={css.subtitle}>
            Dive into the quiz and see how much you know!
          </h3> */}
        </div>
        <div className="cubeBlock">
          <CubeGallery />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
