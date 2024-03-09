import React from 'react';
import { Spin } from 'antd';
import { useTheme } from 'antd-style';
import styles from './Loader.module.css';

const Loader = () => {
  const theme = useTheme();
  return (
    <div
      className={styles.loader}
      style={{
        background: theme.colorPrimaryBg,
      }}
    >
      <Spin size='large' />
    </div>
  );
};

export default Loader;
