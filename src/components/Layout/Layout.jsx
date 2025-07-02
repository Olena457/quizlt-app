import { Outlet } from 'react-router-dom';
import AppBar from '../AppBar/AppBar.jsx';
import css from './layout.module.css';

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
