import React from 'react';
import { Button } from 'antd';
import { articlesAPI } from '../../../services/articles';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { isEmail, isPassword, isUsername, isUrl } from '../validateFuncs';
import { IerrorResponse } from '../../../types/article';
import { useTheme } from 'antd-style';
import Loader from '../../Loader/Loader';
import styles from '../Forms.module.css';

type FieldType = {
  username: string;
  email: string;
  password: string;
  image: string;
};

const Profile = () => {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldType>();

  const [updateUser, { data: responseData, error }] =
    articlesAPI.useUpdateUserMutation();

  const token = useTypedSelector((state) => state.token);

  const { data: currentUser, isLoading } =
    articlesAPI.useGetCurrentUserQuery(token);

  const submit: SubmitHandler<FieldType> = (updatedData) => {
    const user: { [key: string]: string } = {};
    for (let [key, value] of Object.entries(updatedData)) {
      if (value !== '') user[key] = value;
    }

    updateUser({ user: user, token: token.token });
  };

  const formError: SubmitErrorHandler<FieldType> = (error) => {
    console.log(error);
  };

  let serverError = null;
  if (error) {
    serverError = error as IerrorResponse;
  }

  if (!token?.token) return <Navigate to={'/sign-in'} />;
  if (isLoading) return <Loader />;
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
      >
        <div className={styles.title}>Edit Profile</div>

        <div className={styles.input_label}>Username</div>
        <input
          type='text'
          defaultValue={currentUser?.user.username}
          className={
            errors.username
              ? `${styles.input} ${styles.input_error}`
              : styles.input
          }
          placeholder='Username'
          {...register('username', { validate: isUsername })}
        />
        <div className={styles.error}>
          {(errors.username && 'Your username needs to be 3-20 characters.') ||
            (serverError?.data.errors.username &&
              `This username is already taken!`)}
        </div>

        <div className={styles.input_label}>Email address</div>
        <input
          type='email'
          defaultValue={currentUser?.user.email}
          className={
            errors.email
              ? `${styles.input} ${styles.input_error}`
              : styles.input
          }
          placeholder='Email address'
          {...register('email', { validate: isEmail })}
        />
        <div className={styles.error}>
          {(errors.email && 'Invalid email address!') ||
            (serverError?.data.errors.email &&
              `This email address is already taken!`)}
        </div>

        <div className={styles.input_label}>New password</div>
        <input
          type='password'
          defaultValue={currentUser?.user.password}
          className={
            errors.password
              ? `${styles.input} ${styles.input_error}`
              : styles.input
          }
          placeholder='New password'
          {...register('password', { validate: isPassword })}
        />
        <div className={styles.error}>
          {errors.password && 'Your password needs to be 6-40 characters.'}
        </div>

        <div className={styles.input_label}>{`Avatar image (url)`}</div>
        <input
          type='text'
          defaultValue={currentUser?.user.image}
          className={
            errors.image
              ? `${styles.input} ${styles.input_error}`
              : styles.input
          }
          placeholder='Avatar image'
          {...register('image', {
            validate: isUrl,
          })}
        />
        <div className={styles.error}>{errors.image && 'Invalid URL!'}</div>

        <Button type='primary' htmlType='submit' className={styles.btn}>
          Save
        </Button>
      </form>
    </div>
  );
};

export default Profile;
