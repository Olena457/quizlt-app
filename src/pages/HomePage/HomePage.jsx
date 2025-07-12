import { NavLink } from 'react-router-dom';
import CubeGallery from '../../components/CubeGallery/CubeGallery.jsx';
import cupImg from '../../assets/icons/cup.svg';
import photoImg from '../../assets/images/photo.png';
import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={css.containerPage}>
      <div className={css.containerHome}>
        <div className={css.introBlock}>
          <div className={css.titleAndButtonWrapper}>
            <div className={css.titleWithLogo}>
              <h1 className={css.title}>Quizlet</h1>
              <div className={css.logoContainer}>
                <img src={photoImg} alt="background" className={css.pngLayer} />
                <img
                  src={cupImg}
                  alt="cup"
                  width={15}
                  height={15}
                  className={css.svgLayer}
                />
              </div>
            </div>
            <div className={css.buttonWrapper}>
              <NavLink to="/start" className={css.buttonHome}>
                start
              </NavLink>
            </div>
          </div>
        </div>
        <div className="cubeBlock">
          <CubeGallery />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
