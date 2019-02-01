import * as Router from 'koa-router';
import * as controller from './controller';

const router = new Router();

router.get('/', controller.home.index);

export default router;
