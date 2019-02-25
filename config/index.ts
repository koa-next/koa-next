import defaultConfig from './config.default';
import localConfig from './config.local';
import prodConfig from './config.prod';
import testConfig from './config.unittest';

export interface IConfig {
  key: string;
  log4: object;
  next?: object;
}

const env = process.env.NODE_ENV;

const getConfig = () => {
  if (env && env === 'prod') {
    return {
      ...defaultConfig,
      prodConfig,
    };
  }

  if (env && env === 'test') {
    return {
      ...defaultConfig,
      ...testConfig,
    };
  }

  return {
    ...defaultConfig,
    ...localConfig,
  };
};

const config: IConfig = getConfig();

export default config;
