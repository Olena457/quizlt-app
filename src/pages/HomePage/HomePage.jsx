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
              Play Quiz
            </NavLink>
            <NavLink to="/create-card" className={css.buttonHome}>
              Greate Quiz
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
