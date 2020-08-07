import { Context } from 'koa';
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf } = format;

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DDTHH:mm:ss.SSS',
    }),
    printf(info => {
      return `${info.timestamp} ${info.level.toUpperCase()} ${info.message}`;
    }),
  ),

  transports: [
    new transports.File({
      filename: 'logs/nest-access.log',
      level: 'info',
    }),
    new transports.File({
      filename: 'logs/nest-error.log',
      level: 'error',
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console());
}

export default () => {
  return async (ctx: Context, next: () => Promise<any>) => {
    ctx.logger = logger;
    await next();
  };
};
