import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectorsAuth.js';
import { logoutUser } from '../../redux/auth/operationsAuth.js';
import Navigation from '../Navigation/Navigation.jsx';
import logoBubl from '../../assets/icons/logoBubl.svg';
import MobileMenu from '../MobileMenu/MobileMenu.jsx';
import css from './AppBar.module.css';

const AppBar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.brand}>
          <h2 className={css.title}>Quizlet game</h2>

          <div className={css.logoContainer}>
            <img
              src={logoBubl}
              alt="logo"
              width="20"
              height="20"
              className={css.logo}
            />
          </div>
        </div>
        <MobileMenu />
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
    </div>
  );
};

export default AppBar;
