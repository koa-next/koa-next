import defaultConfig from './config.default';
import localConfig from './config.local';
import preConfig from './config.pre';
import prodConfig from './config.prod';
import _ from 'lodash';

export interface IConfig {
  key: string;
  next: object;
}

let config: IConfig;
const env = process.env.NODE_ENV;

if (!env || (env !== 'pre' && env !== 'prod')) {
  config = _.merge({}, defaultConfig, localConfig);
}

if (env && env === 'pre') {
  config = _.merge({}, defaultConfig, preConfig);
}

if (env && env === 'prod') {
  config = _.merge({}, defaultConfig, prodConfig);
}

export default config;
