import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/selectorsAuth.js';
import css from './MobileMenu.module.css';
import burgerIcon from '../../assets/icons/burgerIcon.svg';
import crossIcon from '../../assets/icons/crossIcon.svg';
import logoBubl from '../../assets/icons/logoBubl.svg';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <>
      <div className={css.brand}>
        <NavLink to="/">
          <h2 className={css.title}>Quizlet game</h2>
        </NavLink>
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
      {!isOpen && (
        <button className={css.burgerButton} onClick={() => setIsOpen(true)}>
          <img src={burgerIcon} alt="Open Menu" width="40" height="40" />
        </button>
      )}
      <div className={`${css.mobileMenu} ${isOpen ? css.open : ''}`}>
        {isOpen && (
          <>
            <button
              className={css.closeButton}
              onClick={() => setIsOpen(false)}
            >
              <img src={crossIcon} alt="Close Menu" width="40" height="40" />
            </button>

            <nav className={css.menuList}>
              {!isLoggedIn && (
                <>
                  <NavLink
                    to="/register-user"
                    className={css.link}
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </NavLink>
                  <NavLink
                    to="/login"
                    className={css.link}
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </NavLink>
                </>
              )}

              {/* <NavLink
                to="/cards"
                className={css.link}
                onClick={() => setIsOpen(false)}
              >
                Quiz
              </NavLink>
              <NavLink
                to="/filter"
                className={css.link}
                onClick={() => setIsOpen(false)}
              >
                Filter
              </NavLink> */}
              <NavLink
                to="/categories"
                className={css.link}
                onClick={() => setIsOpen(false)}
              >
                Categories Quiz
              </NavLink>

              {isLoggedIn && (
                <>
                  <NavLink
                    to="/favorites"
                    className={css.link}
                    onClick={() => setIsOpen(false)}
                  >
                    Favorites
                  </NavLink>
                  <NavLink
                    to="/create-card"
                    className={css.link}
                    onClick={() => setIsOpen(false)}
                  >
                    Create Card
                  </NavLink>
                </>
              )}
            </nav>
          </>
        )}
      </div>
    </>
  );
};

export default MobileMenu;
