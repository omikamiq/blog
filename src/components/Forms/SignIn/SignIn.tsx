import React from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { Button } from 'antd';
import { Link, Navigate } from 'react-router-dom';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { isEmail, isPassword } from '../validateFuncs';
import { articlesAPI } from '../../../services/articles';
import { setToken } from '../../../store/slices/tokenSlice';
import { useTheme } from 'antd-style';
import styles from '../Forms.module.css';

type FieldType = {
  email: string;
  password: string;
};

const SignIn = () => {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldType>();

  const [loginUser, { data: responseData, error }] =
    articlesAPI.useLoginUserMutation();

  const dispatch = useDispatch();

  const submit: SubmitHandler<FieldType> = async (loginData) => {
    const user = {
      user: {
        email: loginData.email,
        password: loginData.password,
      },
    };

    await loginUser(user);
  };
  if (responseData) {
    dispatch(setToken(responseData.user.token));
    sessionStorage.setItem('token', responseData.user.token);
  }

  const formError: SubmitErrorHandler<FieldType> = (error) => {
    console.log(error);
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
        onSubmit={handleSubmit(submit, formError)}
        style={{
          color: theme.colorTextBase,
          background: theme.colorBgBase,
        }}
      >
        <div className={styles.title}>Sign In</div>

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
          {errors.email && 'Invalid email address!'}
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
          {(errors.password && 'Incorrect password') ||
            (error && 'Incorrect password or email!')}
        </div>

        <Button type='primary' htmlType='submit' className={styles.btn}>
          Login
        </Button>

        <Link to={'/sign-up'} className={styles.opposite_action_wrapper}>
          Don't have an account? {<div className={styles.link}>Sign Up.</div>}
        </Link>
      </form>
    </div>
  );
};

export default SignIn;
