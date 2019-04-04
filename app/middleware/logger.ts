import { Context } from 'koa';
import logger from '../../utils/logger';

export default () => {
  return async (ctx: Context, next: () => Promise<any>) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    logger.info(`Response-Time: ${ms}ms`);
  };
};
