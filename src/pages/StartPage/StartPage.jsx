// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { selectIsLoggedIn } from '../../redux/auth/selectorsAuth';
import css from './StartPage.module.css';

const StartPage = () => {
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  const handlePlayClick = () => {
    navigate('/category');
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Welcome to the Start Page</h1>
      <p className={css.description}>
        Ready to challenge your knowledge and have fun? Dive into the quiz and
        see how much you know!
      </p>
      <button onClick={handlePlayClick} className={css.playButton}>
        Play Now
      </button>
    </div>
  );
};

export default StartPage;
