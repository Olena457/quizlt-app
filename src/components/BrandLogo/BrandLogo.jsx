import { NavLink } from 'react-router-dom';
import cupImg from '../../assets/icons/cup.svg';
import photoImg from '../../assets/images/photo.png';
import css from './BrandLogo.module.css';

const BrandLogo = () => {
  return (
    <div className={css.brand}>
      <NavLink to="/">
        <h2 className={css.title}>Quizlet</h2>
      </NavLink>
      <div className={css.logoContainer}>
        <img src={photoImg} alt="background" className={css.pngLayer} />
        <img
          src={cupImg}
          alt="cup"
          width={40}
          height={40}
          className={css.svgLayer}
        />
      </div>
    </div>
  );
};

export default BrandLogo;
