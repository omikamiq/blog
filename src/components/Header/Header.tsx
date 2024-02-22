import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className={styles.header}>
      <Link to='/articles' className={styles.home_logo}>
        Realworld Blog
      </Link>
      <div className={styles.btn_wrapper}>
        <Link to={'/sign-in'} className={styles.signin_btn}>
          Sign In
        </Link>
        <Link to={'/sign-up'} className={styles.signup_btn}>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Header;
