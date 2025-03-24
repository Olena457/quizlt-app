import css from './RegistrationPage.module.css';
import SignUpForm from '../../components/SignUpForm/SignUpForm.jsx';

const RegistrationPage = () => {
  return (
    <>
      <div className={css.userRegisPage}>
        <div className={css.userRegisContainer}>
          <SignUpForm />
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
