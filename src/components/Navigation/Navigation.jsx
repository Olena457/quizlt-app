import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectorsAuth.js';
import { selectCardsLoading } from '../../redux/cards/selectorsCards.js';
import css from './Navigation.module.css';

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const activeLink = ({ isActive }) => clsx(css.link, isActive && css.active);
  const cardsLoading = useSelector(selectCardsLoading);
  return (
    <div className={css.container}>
      <NavLink to="/cards" className={activeLink}>
        Quiz
      </NavLink>
      {!cardsLoading && (
        <NavLink to="/filter" className={activeLink}>
          Filter
        </NavLink>
      )}

      {!isLoggedIn && (
        <>
          <NavLink to="/login" className={activeLink}>
            Login
          </NavLink>
          <NavLink
            to="/register-user"
            className={activeLink}
            aria-label="Register"
          >
            Register
          </NavLink>
        </>
      )}
      {isLoggedIn && (
        <>
          <NavLink
            to="/favorites"
            className={activeLink}
            aria-label="Favorites"
          >
            Favorites
          </NavLink>
          <NavLink
            to="/create-card"
            className={activeLink}
            aria-label="Create card"
          >
            Create Card
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Navigation;
