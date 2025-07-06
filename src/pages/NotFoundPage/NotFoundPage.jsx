import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={css.pageNotFound}>
      <div className={css.NotFoundQuiz}>
        <h1 className={css.notFound}> 404 not found </h1>
        <Link to="/" className={css.btnGo}>
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
