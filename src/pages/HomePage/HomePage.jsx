import { NavLink } from 'react-router-dom';
import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <>
      <div className={css.containerHomePage}>
        <div className={css.containerWelcome}>
          <h4 className={css.title}> Welcome to Event Board!</h4>
          <div className={css.contWrapper}>
            <p className={css.message}>
              Sign up and log in to enjoy all features.
            </p>
          </div>
          <div className={css.buttonWrapper}>
            <NavLink
              to="/cards"
              className={`${css.buttonHomePage} ${css.buttonMargin}`}
            >
              Go Quize
            </NavLink>
            <NavLink to="/create-card" className={css.buttonHomePage}>
              Create Quize
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
