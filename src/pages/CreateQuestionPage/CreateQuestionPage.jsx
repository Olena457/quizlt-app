import { useNavigate } from 'react-router-dom';
import CreateQuestionForm from '../../components/CreateQuestionForm/CreateQuestionForm.jsx';
import css from './CreateQuestionPage.module.css';

const CreateQuestionPage = () => {
  const navigate = useNavigate();

  return (
    <div className={css.createPage}>
      <div className={css.container}>
        <div className={css.createForm}>
          <CreateQuestionForm />
        </div>
        <div className={css.buttonWrapper}>
          <button
            onClick={() => navigate('/category')}
            className={css.backButton}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuestionPage;
