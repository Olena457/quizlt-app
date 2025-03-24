import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/auth/operationsAuth.js';
import Navigation from '../Navigation/Navigation.jsx';
import { selectIsLoggedIn } from '../../redux/auth/selectorsAuth.js';
import css from './AppBar.module.css';
import favicon from '../../../public/favicon.svg';

const AppBar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={css.header}>
      <div className={css.brand}>
        <h2 className={css.title}>Quizlt game</h2>

        <div className={css.logoContainer}>
          <img src={favicon} alt="favicon " className={css.logo} role="img" />
        </div>
      </div>
      <Navigation />
      {isLoggedIn && (
        <div className={css.sigWrapper}>
          <button
            type="button"
            onClick={() => dispatch(logoutUser())}
            className={css.buttonLogout}
            aria-label="log out"
          >
            <span className={css.logoutText}>Log out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AppBar;
