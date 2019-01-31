import Koa from 'koa';
import Next from 'next';
import config from './config';
import router from './app/router';
import logger from './app/middleware/logger';
import next from './app/middleware/next';

const PORT = process.env.PORT || 3000;
const app = new Koa();
const appnext = Next(config.next);

app.use(next(appnext));
app.use(logger());
app.use(router.routes());

app.listen(PORT);
console.log(`listening on port ${PORT}`);

export default app;
