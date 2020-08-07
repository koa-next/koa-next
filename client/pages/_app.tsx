import { ConfigProvider, message } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import withRedux from 'next-redux-wrapper';
import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../redux';
import { State } from '../redux/modules';
import { setLocales } from '../redux/modules/common';
import '../styles/layout.scss';
import { getLocales } from '../utils/locale';
import { app as logger } from '../utils/logger';

// from cookie
const PLATLANG = 'zh';

class MyApp extends App<any> {
  static async getInitialProps({ Component, ctx }) {
    try {
      const { store, isServer } = ctx;
      let pageProps = {};

      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }

      if (isServer) {
        store.dispatch(setLocales(getLocales(PLATLANG)));
      }

      return { pageProps };
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  componentDidMount() {
    // show server request error
    const state: State = this.props.store.getState();
    Object.values(state).forEach(item => {
      if (item?.error) {
        message.error(item.error);
      }
    });
    // fix ssr style onload flash
    // https://github.com/ant-design/ant-design/issues/16037
    window.addEventListener('load', () => {
      document.getElementById('holderStyle').remove();
    });
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <ConfigProvider locale={zhCN}>
          <Head>
            <title>KoaNext</title>
          </Head>
          <Component {...pageProps} />
        </ConfigProvider>
      </Provider>
    );
  }
}

export default withRedux(configureStore)(MyApp);
