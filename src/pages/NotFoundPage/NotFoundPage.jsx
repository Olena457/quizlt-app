import css from './NotFoundPage.module.css';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <>
      <div className={css.container}>
        <Link to="/" className={css.btnGo}>
          Go Home
        </Link>
      </div>
    </>
  );
};

export default NotFoundPage;
