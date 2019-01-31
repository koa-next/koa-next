import { Context } from 'koa';

export async function nextsender(ctx: Context, app: any) {
  if (!app.prepared) {
    await app.prepare();
    app.prepared = true;
  }
  const requestHandler = app.getRequestHandler();
  await requestHandler(ctx.req, ctx.res);
}

export default (app: any) => async (ctx: Context, next: () => Promise<any>) => {
  const path = ctx.path;

  if (/\/_next\//.test(path)) {
    await nextsender(ctx, app);
  } else {
    await next();
    if (ctx.status !== 404 || ctx.method !== 'GET') {
      return;
    }
    await nextsender(ctx, app);
  }
};
