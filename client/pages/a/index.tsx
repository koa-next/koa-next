import React from 'react';
import { Button } from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { INCREMENT, DECREMENT } from '../../redux/reducers/counter';
import styles from './style.scss';

interface AProps {
  counter: number;
  dispatch: Dispatch;
}

class A extends React.Component<AProps, any> {
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

  render() {
    return (
      <div className={styles.wrapper}>
        <div>test</div>
        <span>{this.props.counter}</span>
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
      </div>
    );
  }
}

export default connect(state => state)(A);
