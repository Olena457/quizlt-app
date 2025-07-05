import { useNavigate } from 'react-router-dom';
import css from './StartPage.module.css';

const StartPage = () => {
  const navigate = useNavigate();

  const handlePlayClick = () => {
    navigate('/category');
  };

  return (
    <div className={css.pageStart}>
      <div className={css.startContainer}>
        <div className={css.startQuiz}>
          <div className={css.description}>
            <h1 className={css.title}>Welcome to the Start Page</h1>
            <p>Log in — register and create your profile.</p>
            <p>Pick a category — pick what interests you.</p>
            <p>Play the quiz — answer the questions correctly.</p>
            <p>See your stats — check your score and speed.</p>
            <p>View leaderboards — compare with others players.</p>
            <p>Add your own questions — create, edit, or delete.</p>
            <p>Play. Discover. Learn. Compete. Grow. 🏆</p>
          </div>
          <button onClick={handlePlayClick} className={css.playButton}>
            Play Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
