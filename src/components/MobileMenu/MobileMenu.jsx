import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './MobileMenu.module.css';
import burgerIcon from '../../assets/icons/burgerIcon.svg';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(prev => !prev);

  return (
    <div className={css.mobileMenu}>
      <button className={css.burgerButton} onClick={toggleMenu}>
        <img src={burgerIcon} alt="Menu" width="30" height="30" />
      </button>

      <nav className={clsx(css.menuList, { [css.hidden]: !isOpen })}>
        <NavLink to="/" className={css.link} onClick={toggleMenu}>
          Home
        </NavLink>
        <NavLink to="/cards" className={css.link} onClick={toggleMenu}>
          Quiz
        </NavLink>
        <NavLink to="/filter" className={css.link} onClick={toggleMenu}>
          Filter
        </NavLink>
        <NavLink to="/login" className={css.link} onClick={toggleMenu}>
          Login
        </NavLink>
        <NavLink to="/register-user" className={css.link} onClick={toggleMenu}>
          Register
        </NavLink>
        <NavLink to="/favorites" className={css.link} onClick={toggleMenu}>
          Favorites
        </NavLink>
        <NavLink to="/create-card" className={css.link} onClick={toggleMenu}>
          Create Card
        </NavLink>
      </nav>
    </div>
  );
};

export default MobileMenu;
// import { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import css from './MobileMenu.module.css';
// import burgerIcon from '../../assets/icons/burgerIcon.svg';
// import closeIcon from '../../assets/icons/closeIcon.svg';

// const MobileMenu = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const openMenu = () => setIsOpen(true);
//   const closeMenu = () => setIsOpen(false);

//   return (
//     <div className={css.mobileMenu}>
//       {!isOpen && (
//         <button className={css.burgerButton} onClick={openMenu}>
//           <img src={burgerIcon} alt="Open Menu" width="30" height="30" />
//         </button>
//       )}

//       {isOpen && (
//         <>
//           <button className={css.closeButton} onClick={closeMenu}>
//             <img src={closeIcon} alt="Close Menu" width="30" height="30" />
//           </button>

//           <nav className={css.menuList}>
//             <NavLink to="/" className={css.link} onClick={closeMenu}>
//               Home
//             </NavLink>
//             <NavLink to="/cards" className={css.link} onClick={closeMenu}>
//               Quiz
//             </NavLink>
//             <NavLink to="/filter" className={css.link} onClick={closeMenu}>
//               Filter
//             </NavLink>
//             <NavLink to="/login" className={css.link} onClick={closeMenu}>
//               Login
//             </NavLink>
//             <NavLink
//               to="/register-user"
//               className={css.link}
//               onClick={closeMenu}
//             >
//               Register
//             </NavLink>
//             <NavLink to="/favorites" className={css.link} onClick={closeMenu}>
//               Favorites
//             </NavLink>
//             <NavLink to="/create-card" className={css.link} onClick={closeMenu}>
//               Create Card
//             </NavLink>
//           </nav>
//         </>
//       )}
//     </div>
//   );
// };

// export default MobileMenu;
