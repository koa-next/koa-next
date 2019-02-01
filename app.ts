import * as Koa from 'koa';
import * as Next from 'next';
import config from './config';
import router from './app/router';
import logger from './app/middleware/logger';
import next from './app/middleware/next';

const app = new Koa();

if (config.next) {
  const appnext = Next(config.next);
  app.use(next(appnext));
}
app.use(logger());
app.use(router.routes());

export default app;
