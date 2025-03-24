import css from './RegistrationPage.module.css';
import SignUp from '../../pages/RegistrationPage/RegistrationPage';

const RegistrationPage = () => {
  return (
    <>
      <div className={css.userRegisPage}>
        <div className={css.userRegisContainer}>
          <SignUp />
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
