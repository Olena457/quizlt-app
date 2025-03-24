import css from './layout.module.css';
import { Outlet } from 'react-router-dom';
import AppBar from '../AppBar/AppBar.jsx';

const Layout = ({ children }) => {
  return (
    <>
      <AppBar />
      <div className={css.container}>{children}</div>
      <Outlet />
    </>
  );
};

export default Layout;
