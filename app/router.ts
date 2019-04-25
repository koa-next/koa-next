import * as Router from 'koa-router';
import * as controller from './controller';

const router = new Router();

router.get('/', controller.home.index);
router.post('/api/test', controller.home.test);

export default router;
