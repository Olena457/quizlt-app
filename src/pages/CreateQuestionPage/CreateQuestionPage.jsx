import CreateQuestionForm from '../../components/CreateQuestionForm/CreateQuestionForm.jsx';
import css from './CreateQuestionPage.module.css';

const CreateQuestionPage = () => {
  return (
    <div className={css.createPage}>
      <div className={css.createForm}>
        <CreateQuestionForm />
      </div>
    </div>
  );
};

export default CreateQuestionPage;
