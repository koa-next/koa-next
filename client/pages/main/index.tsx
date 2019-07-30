import React from 'react';
import Router from 'next/router';
import { Button, message } from 'antd';
import { of } from 'rxjs';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State, rootEpics } from '../../redux/modules';
import {
  State as commonState,
} from '../../redux/modules/common';
import {
  searchCounter,
  fetchCounterController,
  State as counterState,
} from '../../redux/modules/counter';
import styles from './style.scss';

interface MainProps {
  common: commonState;
  counter: counterState;
  dispatch: Dispatch;
}

const Main = (props: MainProps) => {
  const { common, counter, dispatch } = props;
  const { __ } = common;
  const { num } = counter;

  const increment = () => {
    dispatch(searchCounter({}, {
      headers: {
        requestId: 1
      }
    }));
  };

  const decrement = () => {
    fetchCounterController({}, {
      headers: {
        requestId: 1
      }
    }).then((res: any) => {
      if (res.success) {
        console.log(res.result);
        return;
      }
      message.error(res.errorMsg || '接口错误');
    });
  };

  const gotoPageA = () => {
    Router.push('/a');
  };

  const gotoPageB = () => {
    Router.push('/b');
  };

  return (
    <div className={styles.main}>
      <p>hello, koa-next</p>
      <h3>多语言测试: {__.main.text}</h3>
      <div className={styles.example}>
        <span>{num}</span>
        <div className={styles.btn}>
          <Button onClick={increment}>+</Button>
          <Button onClick={decrement}>-</Button>
        </div>
      </div>
      <Button onClick={gotoPageA}>跳转到 A 页面</Button>
      <Button onClick={gotoPageB}>跳转到 B 页面</Button>
    </div>
  );
};

Main.getInitialProps = async ({ store }) => {
  const resultAction = await rootEpics(
    of(searchCounter())
  ).toPromise();
  store.dispatch(resultAction);
  return {};
};

export default connect((state: State) => ({
  common: state.common,
  counter: state.counter,
}))(Main);
