import * as Koa from 'koa';
import * as log4js from 'koa-log4';
import * as Next from 'next';
import * as LRUCache from 'lru-cache';
import NextMiddleware from 'koa-next-middleware';
import config from './config';
import router from './app/router';
import logger from './app/middleware/logger';

const app = new Koa();

const isDev = process.env.NODE_ENV !== 'pro';
const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 // 1hour
});

if (config.next) {
  const appnext = Next(config.next);
  app.use(NextMiddleware(appnext, {
    cache: isDev ? null : ssrCache
  }));
}

log4js.configure(config.log4);
app.use(log4js.koaLogger(log4js.getLogger('http')));
app.use(logger());
app.use(router.routes());

export default app;
