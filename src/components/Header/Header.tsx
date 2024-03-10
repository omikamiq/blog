import React from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { articlesAPI } from '../../services/articles';
import { setToken } from '../../store/slices/tokenSlice';
import { Link } from 'react-router-dom';
import { ThemeMode, useTheme, useThemeMode } from 'antd-style';
import { Segmented } from 'antd';
import avatar from '../../assets/avatar.png';
import styles from './Header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  let token = useTypedSelector((state) => state.token);
  const tokenCheck = sessionStorage.getItem('token');
  if (tokenCheck) {
    token = {
      token: tokenCheck ? tokenCheck : '',
    };
  }

  const theme = useTheme();
  const { themeMode, setThemeMode } = useThemeMode();
  const options = [
    { label: 'Light mode', value: 'light' },
    { label: 'Dark mode', value: 'dark' },
  ];

  const { data: currentUser } = articlesAPI.useGetCurrentUserQuery(token);
  dispatch(setToken(token.token));

  const logOutHandler = () => {
    dispatch(setToken(''));
    sessionStorage.setItem('token', '');
  };

  const unloginedItems = (
    <div className={styles.btn_wrapper}>
      <Segmented
        options={options}
        value={themeMode}
        onChange={(v) => setThemeMode(v as ThemeMode)}
        size='small'
        className={styles.switcher}
      />
      <Link
        to={'/sign-in'}
        className={styles.signin_btn}
        style={{
          color: theme.colorTextBase,
          background: theme.colorPrimaryBg,
        }}
      >
        Sign In
      </Link>
      <Link
        to={'/sign-up'}
        className={styles.signup_btn}
        style={{
          background: theme.colorBgBase,
        }}
      >
        Sign Up
      </Link>
    </div>
  );

  const loginedInItems = (
    <div className={styles.logined_btn_wrapper}>
      <Segmented
        options={options}
        value={themeMode}
        onChange={(v) => setThemeMode(v as ThemeMode)}
        size='small'
        className={styles.switcher}
      />
      <Link
        to={'/new-article'}
        className={styles.create_btn}
        style={{
          background: theme.colorBgBase,
        }}
      >
        Create article
      </Link>
      <Link to={'/profile'} className={styles.profile}>
        <div
          className={styles.username}
          style={{
            color: theme.colorTextBase,
            background: theme.colorBgBase,
          }}
        >
          {currentUser?.user.username}
        </div>
        <img
          className={styles.avatar}
          src={currentUser?.user.image || avatar}
        ></img>
      </Link>
      <button
        onClick={() => logOutHandler()}
        type='button'
        className={styles.logout_btn}
        style={{
          color: theme.colorTextBase,
          background: theme.colorBgBase,
          border: `1px solid ${theme.colorTextBase}`,
        }}
      >
        Log out
      </button>
    </div>
  );

  const itemsToRender = token.token ? loginedInItems : unloginedItems;
  return (
    <div
      className={styles.header}
      style={{
        color: theme.colorTextBase,
        background: theme.colorBgBase,
      }}
    >
      <Link
        to='/articles'
        className={styles.home_logo}
        style={{
          color: theme.colorTextBase,
          background: theme.colorBgBase,
        }}
      >
        Realworld Blog
      </Link>
      {itemsToRender}
    </div>
  );
};

export default Header;
