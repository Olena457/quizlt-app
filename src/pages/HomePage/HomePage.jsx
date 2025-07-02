import { NavLink } from 'react-router-dom';
import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <>
      <div className={css.containerHome}>
        <div className={css.containerWelcome}>
          <h3 className={css.subtitle}>
            Dive into the quiz and see how much you know!
          </h3>
          <div className={css.buttonWrapper}>
            <NavLink
              to="/login"
              className={`${css.buttonHome} ${css.buttonMargin}`}
            >
              Login
            </NavLink>
            <NavLink to="/register" className={css.buttonHome}>
              Register
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
