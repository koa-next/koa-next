import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import App, { Container } from 'next/app';
import configureStore from '../redux';
import { setLocales } from '../redux/modules/common';
import { getLocales } from '../utils/locale';
import logger from '../utils/logger';
import 'normalize.css/normalize.css';
import '../styles/layout.scss';

// from cookie
const PLATLANG = 'zh';

class MyApp extends App<any> {
  static async getInitialProps({ Component, ctx }) {
    try {
      const { store } = ctx;
      let pageProps = {};

      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }

      store.dispatch(setLocales(getLocales(PLATLANG)));

      return { pageProps };
    } catch (err) {
      logger.error(err);
    }
  }

  componentDidMount() {
    // fix ssr style onload flash
    // https://github.com/ant-design/ant-design/issues/16037
    window.addEventListener('load', () => {
      document.getElementById('holderStyle').remove();
    });
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(configureStore, state => state)(MyApp);
