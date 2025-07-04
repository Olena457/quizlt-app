import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/selectorsAuth.js';
import { logoutUser } from '../../redux/auth/operationsAuth.js';
import Navigation from '../Navigation/Navigation.jsx';
import MobileMenu from '../MobileMenu/MobileMenu.jsx';
import Brandlogo from '../BrandLogo/BrandLogo.jsx';
import logOutIcon from '../../assets/icons/logOutIcon.svg';

import css from './AppBar.module.css';

const AppBar = ({ id, player, category }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <Brandlogo />
        {isMobile ? (
          <MobileMenu id={id} category={category} player={player} />
        ) : (
          <Navigation />
        )}

        {isLoggedIn && (
          <div className={css.sigWrapper}>
            <button
              type="button"
              onClick={handleLogout}
              className={css.buttonLogout}
              aria-label="log out"
            >
              <img
                src={logOutIcon}
                alt="logout icon"
                className={css.logoutIcon}
              />
              {/* <span className={css.logoutText}>Log out</span> */}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppBar;
