import CreateCardForm from '../../components/CreateCardForm/CreateCardForm.jsx';
import css from './CreateCardPage.module.css';

const CreateCardPage = () => {
  return (
    <div className={css.createPage}>
      <div className={css.createForm}>
        <CreateCardForm />
      </div>
    </div>
  );
};

export default CreateCardPage;
