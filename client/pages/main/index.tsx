import React from 'react';
import Router from 'next/router';
import { Button, message } from 'antd';
import { of } from 'rxjs';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State, rootEpics } from '../../redux/modules';
import {
  searchCounter,
  fetchCounterController,
  State as counterState
} from '../../redux/modules/counter';
import styles from './style.scss';

interface MainProps {
  counter: counterState;
  dispatch: Dispatch;
}

const Main = (props: MainProps) => {
  const increment = () => {
    props.dispatch(searchCounter({}, {
      headers: {
        requestId: 1
      }
    }));
  };

  const decrement = () => {
    fetchCounterController().then((res: any) => {
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
      <div className={styles.example}>
        <span>{props.counter.num}</span>
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
};

export default connect((state: State) => ({ counter: state.counter }))(Main);
