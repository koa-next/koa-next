import Router from 'koa-router';
import Next from 'next';
import config from '../config';
import * as controller from './controller';

const router = new Router();
const app: any = Next(config.next);

router.get('/', controller.home.index);

// router.get('*', async (ctx) => {
//   if (!app.prepared) {
//     await app.prepare();
//     app.prepared = true;
//   }
//   const requestHandler = app.getRequestHandler();
//   await requestHandler(ctx.req, ctx.res);
// });

export default router;
