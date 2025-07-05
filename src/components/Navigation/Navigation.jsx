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
          <NavLink to="/register" className={activeLink} aria-label="Register">
            Register
          </NavLink>
          <NavLink to="/login" className={activeLink}>
            Login
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Navigation;
