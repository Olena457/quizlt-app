import { NavLink } from 'react-router-dom';
import css from './Home.module.css';

const Home = () => {
  return (
    <>
      <div className={css.containerHome}>
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
              className={`${css.buttonHome} ${css.buttonMargin}`}
            >
              Go Events
            </NavLink>
            <NavLink to="/create-card" className={css.buttonHome}>
              Create Card
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
