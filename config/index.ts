import defaultConfig from './config.default';
import localConfig from './config.local';
import prodConfig from './config.prod';
import preConfig from './config.pre';
import testConfig from './config.unittest';
import { ServerConstructor } from 'next-server/dist/server/next-server';

export interface IConfig {
  keys: string[];
  next?: ServerConstructor;
}

const env = process.env.NEXT_ENV;

const getConfig = () => {
  if (env && env === 'prod') {
    return {
      ...defaultConfig,
      ...prodConfig,
    };
  }

  if (env && env === 'pre') {
    return {
      ...defaultConfig,
      ...preConfig,
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
