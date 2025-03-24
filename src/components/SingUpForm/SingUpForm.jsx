import css from './SingUpForm.module.css';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useId, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import * as yup from 'yup';
import eye from '../../assets/icons/eye.svg';
import openEye from '../../assets/icons/eye.svg';
import { toast } from 'react-toastify';
import { registerUser } from '../../redux/auth/operationsAuth.js';
import { useNavigate } from 'react-router-dom';

const emailRegExp = /^[\w.-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
const minPasswordLength = 7;
const maxPasswordLength = 22;

const signUpSchema = yup.object({
  name: yup.string().required('Name is required'),

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

const SingUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPassword, setIsPassword] = useState(true);

  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const togglePassword = () => setIsPassword(!isPassword);

  const onSubmit = async data => {
    dispatch(registerUser(data))
      .unwrap()
      .then(() => {
        toast.success('User registered successfully!', {
          position: 'top-center',
        });
        navigate('/login');
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
      <h2 className={css.title} id="sign-up-title">
        Registration in the application Event board
      </h2>
      <p className={css.text} id="sign-up-description">
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={css.form}
        aria-labelledby="sign-up-title"
        aria-describedby="sign-up-description"
      >
        <div className={css.nameWrapper}>
          <label htmlFor={nameId} className={css.label}>
            Name
          </label>
          <input
            id={nameId}
            {...register('name')}
            placeholder="Name"
            className={clsx(css.input, css.name)}
            aria-required="true"
          />
          <p className={css.errorText}>{errors.name?.message}</p>
        </div>

        <div className={css.emailWrapper}>
          <label htmlFor={emailId} className={css.label}>
            Email
          </label>
          <input
            id={emailId}
            {...register('email')}
            placeholder="Email"
            className={clsx(css.input, css.email)}
            autoComplete="email"
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
            className={clsx(css.input, css.password)}
            autoComplete="current-password"
            aria-required="true"
          />
          <button
            type="button"
            onClick={togglePassword}
            className={css.eyeBtn}
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

        <button type="submit" className={css.submitBtn} aria-label="log in">
          Register
        </button>
      </form>
    </div>
  );
};

export default SingUpForm;
