import { Context } from 'koa';
import * as service from '../service';

class HomeController {
  public static async index(ctx: Context) {
    ctx.logger.info('hi koa-next');
    ctx.status = 200;
    ctx.body = await service.home.sayHi('koa-next');
  }
}

export default HomeController;
