import { Context } from 'koa';

export default () => {
  return async (ctx: Context, next: () => Promise<any>) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`Response-Time: ${ms}ms`);
  };
};
