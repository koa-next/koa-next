import { isNode, isPro } from './env';

const config = {
  appenders: {
    koaNextAccess: {
      type: isPro ? 'dateFile' : 'console',
      filename: 'logs/koa-next-access.log',
      pattern: '-yyyy-MM-dd',
      compress: true
    },
    error: {
      type: isPro ? 'dateFile' : 'console',
      filename: 'logs/koa-next-error.log',
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
      level: isPro ? 'error' : 'info'
    }
  }
};

let logger;

if (isNode) {
  const log4js = require('log4js');
  log4js.configure(config);
  logger = log4js.getLogger();
}

export default logger;