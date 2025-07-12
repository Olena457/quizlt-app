import SignUpForm from '../../components/SignUpForm/SignUpForm.jsx';
import css from './RegistrationPage.module.css';

const RegistrationPage = () => {
  return (
    <div className={css.userRegisPage}>
      <div className={css.userRegisContainer}>
        <SignUpForm />
      </div>
    </div>
  );
};

export default RegistrationPage;
