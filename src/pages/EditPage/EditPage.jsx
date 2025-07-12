import { useNavigate } from 'react-router-dom';
import CreateQuestionForm from '../../components/CreateQuestionForm/CreateQuestionForm.jsx';
import css from './EditPage.module.css';

const EditPage = () => {
  const navigate = useNavigate();
  return (
    <div className={css.editPage}>
      <div className={css.container}>
        <div className={css.editForm}>
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

export default EditPage;
