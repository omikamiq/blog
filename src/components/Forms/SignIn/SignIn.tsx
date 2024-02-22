import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { isEmail, isPassword } from '../validateFuncs';
import { articlesAPI } from '../../../services/articles';
import styles from '../Forms.module.css';

type FieldType = {
  email: string;
  password: string;
};

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldType>();

  const [loginUser, {}] = articlesAPI.useLoginUserMutation();

  const submit: SubmitHandler<FieldType> = async (data) => {
    console.log(data);

    await loginUser(data);
  };

  const error: SubmitErrorHandler<FieldType> = (error) => {
    console.log(error);
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(submit, error)}>
      <div className={styles.title}>Sign In</div>

      <div className={styles.input_label}>Email address</div>
      <input
        type='email'
        className={
          errors.email ? `${styles.input} ${styles.input_error}` : styles.input
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
        {errors.password && 'Incorrect password'}
      </div>

      <Button type='primary' htmlType='submit' className={styles.btn}>
        Login
      </Button>

      <Link to={'/sign-up'} className={styles.opposite_action_wrapper}>
        Don't have an account? {<div className={styles.link}>Sign Up.</div>}
      </Link>
    </form>
  );
};

export default SignIn;
