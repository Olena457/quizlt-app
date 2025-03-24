import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useId, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/auth/operationsAuth.js';
const emailRegExp = /^[\w.-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
import eye from '../../assets/icons/eye.svg';
import openEye from '../../assets/icons/openEye.svg';
import css from './SingInForm.module.css';

const minPasswordLength = 7;
const maxPasswordLength = 22;

const signInSchema = yup.object({
  email: yup
    .string()
    .required('Email is required!')
    .matches(emailRegExp, 'Email address is not valid')
    .email('Please enter a valid email address!'),

  password: yup
    .string()
    .required('Password is required!')
    .min(minPasswordLength, 'Too short')
    .max(maxPasswordLength, 'Too long'),
});

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPassword, setIsPassword] = useState(true);

  const emailId = useId();
  const passwordId = useId();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const togglePassword = () => setIsPassword(!isPassword);

  const onSubmit = async data => {
    dispatch(loginUser({ email: data.email, password: data.password }))
      .unwrap()
      .then(() => {
        toast.success('User logged in successfully!', {
          position: 'top-center',
        });
        navigate('/cards');
      })
      .catch(errMessage => {
        toast.error(errMessage, {
          position: 'top-center',
        });
      })
      .finally(() => {
        reset();
      });
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>Log In</h2>
      <p className={css.text}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for events.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={css.form}
        aria-labelledby="sign-in-title"
        aria-describedby="sign-in-description"
      >
        <div className={css.emailWrapper}>
          <label htmlFor={emailId} className={css.label}>
            Email
          </label>
          <input
            id={emailId}
            {...register('email')}
            placeholder="Email"
            autoComplete="email"
            className={clsx(css.input, css.email)}
            aria-required="true"
          />
          <p className={css.errorText}>{errors.email?.message}</p>
        </div>

        <div className={css.passwordWrapper}>
          <label htmlFor={passwordId} className={css.label}>
            Password
          </label>
          <input
            id={passwordId}
            type={isPassword ? 'password' : 'text'}
            {...register('password', { required: true })}
            placeholder="Password"
            autoComplete="current-password"
            className={clsx(css.input, css.password)}
            aria-required="true"
          />
          <button
            type="button"
            onClick={togglePassword}
            className={css.eyeButton}
            aria-label={isPassword ? 'Show password' : 'Hide password'}
          >
            {isPassword ? (
              <img src={openEye} alt="eye pen" className={css.eye} />
            ) : (
              <img src={eye} alt="eye" className={css.eye} />
            )}
          </button>
          {errors.password && (
            <p className={css.errorText}>{errors.password?.message}</p>
          )}
        </div>

        <button type="submit" className={css.buttonSign} aria-label="log in">
          Log In
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
