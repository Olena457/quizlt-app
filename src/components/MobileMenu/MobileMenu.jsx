import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/selectorsAuth.js';
import css from './MobileMenu.module.css';
import burgerIcon from '../../assets/icons/burgerIcon.svg';
import crossIcon from '../../assets/icons/crossIcon.svg';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div>
      {!isOpen && (
        <button className={css.burgerButton} onClick={() => setIsOpen(true)}>
          <img src={burgerIcon} alt="Open Menu" width="40" height="40" />
        </button>
      )}

      {isOpen && (
        <div className={`${css.mobileMenu} ${css.open}`}>
          <button className={css.closeButton} onClick={() => setIsOpen(false)}>
            <img src={crossIcon} alt="Close Menu" width="40" height="40" />
          </button>

          <nav className={css.menuList}>
            <NavLink
              to="/register"
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

            <NavLink
              to="/start"
              className={css.link}
              onClick={() => setIsOpen(false)}
            >
              Start
            </NavLink>
            <NavLink
              to="/category"
              className={css.link}
              onClick={() => setIsOpen(false)}
            >
              Categories
            </NavLink>

            {isLoggedIn && (
              <>
                <NavLink
                  to="/create-question"
                  className={css.link}
                  onClick={() => setIsOpen(false)}
                >
                  Create Quize
                </NavLink>

                <NavLink
                  to="/edit-question/:category/:id"
                  className={css.link}
                  onClick={() => setIsOpen(false)}
                >
                  Edit Quize
                </NavLink>

                {/* <NavLink
                path="players/:id"
                className={css.link}
                onClick={() => setIsOpen(false)}
                 >
                 View Players
                 </NavLink> */}
              </>
            )}
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
