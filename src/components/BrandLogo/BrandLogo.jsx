import { NavLink } from 'react-router-dom';
import css from './BrandLogo.module.css';
import quizletGame from '../../assets/images/quizlet.png';

const BrandLogo = () => {
  return (
    <div className={css.brand}>
      <NavLink to="/">
        <h2 className={css.title}>Quizlet game</h2>
      </NavLink>
      <div className={css.logoContainer}>
        <img
          src={quizletGame}
          alt="quizlet"
          width="20"
          height="20"
          className={css.logo}
        />
      </div>
    </div>
  );
};

export default BrandLogo;
