import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.skeletonWrapper}>
      <div className={css.navSkeleton}>
        <div className={css.navItem}></div>
        <div className={css.navItem}></div>
        <div className={css.navItem}></div>
      </div>

      <div className={css.headlineSkeleton}></div>
      <div className={css.thumbnail}></div>

      <div className={css.textBlock}>
        <div className={css.title}></div>
        <div className={css.subtitle}></div>
        <div className={css.contentLines}>
          <div className={css.contentLine}></div>
          <div className={`${css.contentLine} ${css.short}`}></div>
          <div className={css.contentLine}></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
