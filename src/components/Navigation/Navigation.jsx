import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { selectIsLoggedIn } from '../../redux/auth/selectorsAuth.js';
import css from './Navigation.module.css';

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const activeLink = ({ isActive }) => clsx(css.link, isActive && css.active);
  return (
    <div className={css.container}>
      <NavLink to="/" className={activeLink} aria-label="Home">
        Home
      </NavLink>
      <NavLink to="/start" className={activeLink}>
        Start
      </NavLink>
      <NavLink to="/category" className={activeLink}>
        Categories
      </NavLink>

      {!isLoggedIn && (
        <>
          <NavLink to="/login" className={activeLink}>
            Login
          </NavLink>
          <NavLink to="/register" className={activeLink} aria-label="Register">
            Register
          </NavLink>
        </>
      )}
      {isLoggedIn && (
        <>
          <NavLink
            to="/create-question"
            className={activeLink}
            aria-label="Create card"
          >
            Create Question
          </NavLink>
          <NavLink
            to="/create-question"
            className={activeLink}
            aria-label="Create card"
          >
            Edit Question
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Navigation;
