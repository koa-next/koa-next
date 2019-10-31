import { Context } from 'koa';
import * as log4js from 'log4js';

const isPro = process.env.NODE_ENV === 'production';

const config = {
  appenders: {
    koaAccess: {
      type: isPro ? 'dateFile' : 'console',
      filename: 'logs/koa-access.log',
      pattern: '-yyyy-MM-dd',
      compress: true
    },
    error: {
      type: isPro ? 'dateFile' : 'console',
      filename: 'logs/koa-error.log',
      pattern: '-yyyy-MM-dd',
      compress: true
    },
    koaError: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'error'
    }
  },
  categories: {
    default: {
      appenders: ['koaAccess', 'koaError'],
      level: 'info'
    }
  }
};

const logger = log4js.getLogger();
log4js.configure(config);

export default () => {
  return async (ctx: Context, next: () => Promise<any>) => {
    ctx.logger = logger;
    await next();
  };
};
