import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosInstance
} from 'axios';
import * as qs from 'querystring';
import getConfig from 'next/config';
import { isNode } from './env';
import logger from './logger';

interface Iprops {
  body: {
    string?: any;
  };
}

export interface Response {
  success: boolean;
  errorMsg?: string;
  result?: any;
}

const { publicRuntimeConfig } = getConfig();

const checkStatus = (res: AxiosResponse) => {
  const { status } = res;

  if (status >= 200 && status < 300) {
    return res.data;
  }

  return Promise.reject(res);
};

export default (
  url: string,
  { body, method = 'post', ...opts }: AxiosRequestConfig & Iprops
): never | Promise<Response> => {
  const { headers: h } = opts;
  const headers = {
    'content-type': 'application/json; charset=utf-8',
    ...h
  };

  const config: AxiosRequestConfig = {
    ...opts,
    headers
  };

  const baseRequest: AxiosInstance = axios.create(config);

  if (isNode) {
    url = `${publicRuntimeConfig.api}${url}`;
  }

  if (
    method === 'get' ||
    method === 'head' ||
    method === 'options' ||
    method === 'delete'
  ) {
    if (body) {
      url = `${url}?${qs.stringify(body)}`;
    }
  }

  return baseRequest[method](url, body)
    .then(checkStatus)
    .catch((error: AxiosError) => {
      if (isNode) {
        logger.error(error.response);
      }
      throw error.response;
    });
};
