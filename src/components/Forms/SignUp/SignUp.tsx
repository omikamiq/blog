import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { isEmail, isPassword, isUsername } from '../validateFuncs';
import { articlesAPI } from '../../../services/articles';
import styles from '../Forms.module.css';

type FieldType = {
  username: string;
  email: string;
  password: string;
  passwordCheck: string;
  agreement: boolean;
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldType>();

  const [registerNewUser, {}] = articlesAPI.useRegisterNewUserMutation();

  const submit: SubmitHandler<FieldType> = async (data) => {
    console.log(data);

    const user = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    await registerNewUser(user);
  };

  const error: SubmitErrorHandler<FieldType> = (error) => {
    console.log(error);
  };

  const validatePasswordCheck = (password: string) => {
    if (password === watch('password')) return true;
    else return false;
  };
  return (
    <form
      className={styles.wrapper}
      onSubmit={handleSubmit(submit, error)}
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
        {errors.username && 'Your username needs to be 3-20 characters.'}
      </div>

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
  );
};

export default SignUp;
