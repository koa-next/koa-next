// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  // tslint:disable-next-line:no-empty
  require.extensions['.css'] = () => { };
}

const config = {
  key: '123456',
  log4: {
    appenders: {
      console: {
        type: 'console'
      },
      http: {
        type: 'dateFile',
        filename: 'logs/access.log',
        pattern: '-yyyy-MM-dd',
        compress: true
      },
      emergencies: {
        type: 'file',
        filename: 'logs/errors.log'
      },
      error: {
        type: 'logLevelFilter',
        level: 'ERROR',
        appender: 'emergencies'
      }
    },
    categories: {
      console: {
        appenders: ['console'],
        level: 'debug'
      },
      default: {
        appenders: ['http', 'error'],
        level: 'info'
      }
    }
  }
};

export default config;
