import css from './LogInPage.module.css';
import SignIn from '../../components/SingInForm/SingInForm.jsx';

const LogInPage = () => {
  return (
    <>
      <div className={css.loginPage}>
        <div className={css.loginContainer}>
          <SignIn />
        </div>
      </div>
    </>
  );
};

export default LogInPage;
