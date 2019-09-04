import { isNode, isPro } from './env';
import { Configuration, Logger } from 'log4js';

interface Log {
  fetch: Logger;
  observable: Logger;
  app: Logger;
  document: Logger;
}

const config: Configuration = {
  appenders: {
    NextAccess: {
      type: isPro ? 'dateFile' : 'console',
      filename: 'logs/next-access.log',
      pattern: '-yyyy-MM-dd',
      compress: true
    },
    error: {
      type: isPro ? 'dateFile' : 'console',
      filename: 'logs/next-error.log',
      pattern: '-yyyy-MM-dd',
      compress: true
    },
    NextError: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'error'
    }
  },
  categories: {
    default: {
      appenders: ['NextAccess', 'NextError'],
      level: 'info'
    }
  }
};

let logger: Log;

if (isNode) {
  const log4js = require('log4js');
  log4js.configure(config);
  logger = {
    fetch: log4js.getLogger('fetch'),
    observable: log4js.getLogger('observable'),
    app: log4js.getLogger('app'),
    document: log4js.getLogger('document')
  };
}

export default logger;
