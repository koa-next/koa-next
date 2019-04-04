import * as Koa from 'koa';
import * as log4js from 'koa-log4';
import * as session from 'koa-session';
import * as CSRF from 'koa-csrf';
import * as Next from 'next';
import * as LRUCache from 'lru-cache';
import NextMiddleware from 'koa-next-middleware';
import config from './config';
import router from './app/router';
import logger from './app/middleware/logger';
import { isPro } from './utils/env';

const app = new Koa();

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 // 1hour
});

if (config.next) {
  const appnext = Next(config.next);
  app.use(NextMiddleware(appnext, {
    cache: isPro ? ssrCache : null,
  }));
}

log4js.configure(config.log4);

app.keys = config.keys;

app.use(session(app));
app.use(new CSRF());
app.use(log4js.koaLogger(log4js.getLogger('http')));
app.use(logger());
app.use(router.routes());

export default app;
