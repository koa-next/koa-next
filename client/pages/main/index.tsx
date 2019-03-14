import React from 'react';
import Router from 'next/router';
import { Button } from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { INCREMENT, DECREMENT } from '../../redux/reducers/counter';
import styles from './style.scss';

interface MainProps {
  counter: number;
  dispatch: Dispatch;
}

class Main extends React.Component<MainProps, any> {
  componentDidMount() {
    console.log(this.props);
  }

  increment = () => {
    this.props.dispatch({
      type: INCREMENT
    });
  }

  decrement = () => {
    this.props.dispatch({
      type: DECREMENT
    });
  }

  gotoPageA = () => {
    Router.push('/a');
  }

  gotoPageB = () => {
    Router.push('/b');
  }

  render() {
    return (
      <div className={styles.main}>
        <p>hello, koa-next</p>
        <div className={styles.example}>
          <span>{this.props.counter}</span>
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

export default connect(state => state)(Main);
