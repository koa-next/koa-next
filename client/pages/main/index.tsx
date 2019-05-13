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

class Main extends React.Component<MainProps, any> {
  static async getInitialProps({ store }) {
    const resultAction = await rootEpics(
      of(searchCounter())
    ).toPromise();
    store.dispatch(resultAction);
  }

  componentDidMount() {
    console.log(this.props);
  }

  increment = () => {
    this.props.dispatch(searchCounter({}, {
      headers: {
        requestId: 1
      }
    }));
  }

  decrement = () => {
    fetchCounterController().then((res: any) => {
      if (res.success) {
        console.log(res.result);
        return;
      }
      message.error(res.errorMsg || '接口错误');
    });
  }

  gotoPageA = () => {
    Router.push('/a');
  }

  gotoPageB = () => {
    Router.push('/b');
  }

  render() {
    console.log(this.props);
    return (
      <div className={styles.main}>
        <p>hello, koa-next</p>
        <div className={styles.example}>
          <span>{this.props.counter.num}</span>
          <div className={styles.btn}>
            <Button onClick={this.increment}>+</Button>
            <Button onClick={this.decrement}>-</Button>
          </div>
        </div>
        <Button onClick={this.gotoPageA}>跳转到 A 页面</Button>
        <Button onClick={this.gotoPageB}>跳转到 B 页面</Button>
      </div>
    );
  }
}

export default connect((state: State) => ({ counter: state.counter }))(Main);
