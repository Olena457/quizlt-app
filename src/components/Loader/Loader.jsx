// import css from './Loader.module.css';

// const Loader = () => {
//   return (
//     <div className={css.loader}>
//       <div className={css.spinner}></div>
//     </div>
//   );
// };

import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.skeletonWrapper}>
      <div className={css.thumbnail}></div>
      <div className={css.textBlock}>
        <div className={css.title}></div>
        <div className={css.subtitle}></div>
      </div>
    </div>
  );
};

export default Loader;
