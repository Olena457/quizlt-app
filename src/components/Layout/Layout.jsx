// import { Outlet } from 'react-router-dom';
// import AppBar from '../AppBar/AppBar.jsx';
// import css from './layout.module.css';

// const Layout = ({ children }) => {
//   return (
//     <>
//       <AppBar />
//       <div className={css.container}>{children}</div>
//       <Outlet />
//     </>
//   );
// };

// export default Layout;
import { Outlet, useLocation } from 'react-router-dom';
import AppBar from '../AppBar/AppBar.jsx';
import css from './layout.module.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      {!isHomePage && <AppBar />}
      <div className={css.container}>{children}</div>
      <Outlet />
    </>
  );
};

export default Layout;
