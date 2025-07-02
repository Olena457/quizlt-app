import SignIn from '../../components/SingInForm/SingInForm.jsx';
import css from './LogInPage.module.css';

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
