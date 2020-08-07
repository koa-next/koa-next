import { Button } from 'antd';
import Router from 'next/router';
import React from 'react';
import { connect } from 'react-redux';
import styles from './style.scss';

const A = () => {
  const backToMain = () => {
    Router.push('/main');
  };

  return (
    <div className={styles.pageA}>
      <p>pageA</p>
      <Button onClick={backToMain}>回到首页</Button>
    </div>
  );
};

export default connect(state => state)(A);
