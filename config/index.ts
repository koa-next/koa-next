import defaultConfig from './config.default';
import localConfig from './config.local';
import preConfig from './config.pre';
import prodConfig from './config.prod';
import testConfig from './config.unittest';
import * as _ from 'lodash';

export interface IConfig {
  key: string;
  next?: object;
}

const env = process.env.NODE_ENV;

const getConfig = () => {
  if (env && env === 'pre') {
    return _.merge({}, defaultConfig, preConfig);
  }

  if (env && env === 'prod') {
    return _.merge({}, defaultConfig, prodConfig);
  }

  if (env && env === 'test') {
    return _.merge({}, defaultConfig, testConfig);
  }

  return _.merge({}, defaultConfig, localConfig);
};

const config: IConfig = getConfig();

export default config;
