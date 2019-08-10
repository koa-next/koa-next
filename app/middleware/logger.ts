import { Context } from 'koa';
import * as log4js from 'log4js';

const isPro = process.env.NODE_ENV === 'production';

const config = {
  appenders: {
    koaNextAccess: {
      type: isPro ? 'dateFile' : 'console',
      filename: 'logs/access.log',
      pattern: '-yyyy-MM-dd',
      compress: true
    },
    error: {
      type: isPro ? 'dateFile' : 'console',
      filename: 'logs/error.log',
      pattern: '-yyyy-MM-dd',
      compress: true
    },
    koaNextError: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'error'
    }
  },
  categories: {
    default: {
      appenders: ['koaNextAccess', 'koaNextError'],
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

