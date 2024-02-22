import React from 'react';
import { Button } from 'antd';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import styles from '../Forms.module.css';
import { isEmail, isPassword, isUsername, isUrl } from '../validateFuncs';

type FieldType = {
  username: string;
  email: string;
  password: string;
  image: string;
  agreement: boolean;
};

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldType>();

  const submit: SubmitHandler<FieldType> = (data) => {
    console.log(data);
  };

  const error: SubmitErrorHandler<FieldType> = (error) => {
    console.log(error);
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(submit, error)}>
      <div className={styles.title}>Edit Profile</div>

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

      <div className={styles.input_label}>New password</div>
      <input
        type='password'
        className={
          errors.password
            ? `${styles.input} ${styles.input_error}`
            : styles.input
        }
        placeholder='New password'
        {...register('password', { required: true, validate: isPassword })}
      />
      <div className={styles.error}>
        {errors.password && 'Your password needs to be 6-40 characters.'}
      </div>

      <div className={styles.input_label}>{`Avatar image (url)`}</div>
      <input
        type='text'
        className={
          errors.image ? `${styles.input} ${styles.input_error}` : styles.input
        }
        placeholder='Avatar image'
        {...register('image', {
          required: true,
          validate: isUrl,
        })}
      />
      <div className={styles.error}>{errors.image && 'Invalid URL!'}</div>

      <Button type='primary' htmlType='submit' className={styles.btn}>
        Save
      </Button>
    </form>
  );
};

export default Profile;
