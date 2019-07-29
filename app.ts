import Koa from 'koa';
import Next from 'next';
import LRUCache from 'lru-cache';
import NextMiddleware from 'koa-next-middleware';
import config from './config';
import router from './app/router';
import logger from './app/middleware/logger';

const app = new Koa();

const isPro = process.env.NODE_ENV === 'production';
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

app.keys = config.keys;

app.use(logger());
app.use(router.routes());

export default app;
