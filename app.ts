import * as Koa from 'koa';
import * as log4js from 'koa-log4';
import * as Next from 'next';
import config from './config';
import router from './app/router';
import logger from './app/middleware/logger';
import next from 'koa-next-middleware';

const app = new Koa();

if (config.next) {
  const appnext = Next(config.next);
  app.use(next(appnext));
}

log4js.configure(config.log4);
app.use(log4js.koaLogger(log4js.getLogger('http')));
app.use(logger());
app.use(router.routes());

export default app;
