import React from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../../../store/slices/tokenSlice';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { Button } from 'antd';
import { Link, Navigate } from 'react-router-dom';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { isEmail, isPassword, isUsername } from '../validateFuncs';
import { articlesAPI } from '../../../services/articles';
import { IerrorResponse } from '../../../types/article';
import { useTheme } from 'antd-style';
import styles from '../Forms.module.css';

type FieldType = {
  username: string;
  email: string;
  password: string;
  passwordCheck: string;
  agreement: boolean;
};

const SignUp = () => {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldType>();

  const [registerNewUser, { data: registerResponseData, error, isError }] =
    articlesAPI.useRegisterNewUserMutation();

  const dispatch = useDispatch();

  const submit: SubmitHandler<FieldType> = async (registerData) => {
    const user = {
      user: {
        username: registerData.username,
        email: registerData.email,
        password: registerData.password,
      },
    };

    await registerNewUser(user);
  };

  if (registerResponseData) {
    dispatch(setToken(registerResponseData.user.token));
    sessionStorage.setItem('token', registerResponseData.user.token);
  }
  let serverError = null;

  if (error) {
    serverError = error as IerrorResponse;
  }

  const formError: SubmitErrorHandler<FieldType> = (error) => {
    console.log(error);
  };

  const validatePasswordCheck = (password: string) => {
    if (password === watch('password')) return true;
    else return false;
  };
  const { token } = useTypedSelector((state) => state.token);
  if (token) return <Navigate to={'/articles'} />;
  return (
    <div
      className={styles.page}
      style={{
        background: theme.colorPrimaryBg,
      }}
    >
      <form
        className={styles.wrapper}
        style={{
          background: theme.colorBgBase,
          color: theme.colorTextBase,
        }}
        onSubmit={handleSubmit(submit, formError)}
        autoComplete='false'
      >
        <div className={styles.title}>Create new account</div>

        <div className={styles.input_label}>Username</div>
        <input
          type='text'
          className={
            errors.username
              ? `${styles.input} ${styles.input_error}`
              : styles.input
          }
          placeholder='Username'
          {...register('username', { required: true, validate: isUsername })}
        />
        <div className={styles.error}>
          {(errors.username && 'Your username needs to be 3-20 characters.') ||
            (serverError?.data.errors.username &&
              `This username is already taken!`)}
        </div>

        <div className={styles.input_label}>Email address</div>
        <input
          type='email'
          className={
            errors.email
              ? `${styles.input} ${styles.input_error}`
              : styles.input
          }
          placeholder='Email address'
          {...register('email', { required: true, validate: isEmail })}
        />
        <div className={styles.error}>
          {(errors.email && 'Invalid email address!') ||
            (serverError?.data.errors.email &&
              `This email address is already taken!`)}
        </div>

        <div className={styles.input_label}>Password</div>
        <input
          type='password'
          className={
            errors.password
              ? `${styles.input} ${styles.input_error}`
              : styles.input
          }
          placeholder='Password'
          {...register('password', { required: true, validate: isPassword })}
        />
        <div className={styles.error}>
          {errors.password && 'Your password needs to be 6-40 characters.'}
        </div>

        <div className={styles.input_label}>Repeat password</div>
        <input
          type='password'
          className={
            errors.passwordCheck
              ? `${styles.input} ${styles.input_error}`
              : styles.input
          }
          placeholder='Password'
          {...register('passwordCheck', {
            required: true,
            validate: validatePasswordCheck,
          })}
        />
        <div className={styles.error}>
          {errors.username && 'Password must match!'}
        </div>

        <label className={styles.check_wrapper}>
          <input
            type='checkbox'
            {...(register('agreement'), { required: true })}
            className={styles.check}
          ></input>
          <span className={styles.check_text}>
            I agree to the processing of my personal information
          </span>
        </label>

        <Button type='primary' htmlType='submit' className={styles.btn}>
          Create
        </Button>

        <Link to={'/sign-in'} className={styles.opposite_action_wrapper}>
          Already have an account? {<div className={styles.link}>Sign In.</div>}
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
