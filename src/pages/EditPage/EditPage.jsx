import CreateQuestionForm from '../../components/CreateQuestionForm/CreateQuestionForm.jsx';
import css from './EditPage.module.css';

const EditPage = () => {
  return (
    <div className={css.editPage}>
      <h2 className={css.title}>Edit question</h2>
      <div className={css.editForm}>
        <CreateQuestionForm />
      </div>
    </div>
  );
};

export default EditPage;
