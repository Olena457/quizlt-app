import { NavLink } from 'react-router-dom';
import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <>
      <div className={css.containerHome}>
        <div className={css.containerWelcome}>
          <div className={css.buttonWrapper}>
            <NavLink
              to="/cards"
              className={`${css.buttonHome} ${css.buttonMargin}`}
            >
              Go Quize
            </NavLink>
            <NavLink to="/create-card" className={css.buttonHome}>
              Create Quize
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
