import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import getConfig from 'next/config';
import qs from 'querystring';
import { isNode } from './env';
import { fetch as logger } from './logger';

const defaultConfig = {
  timeout: 60000,
};

const { publicRuntimeConfig } = getConfig();

const checkStatus = (res: AxiosResponse) => {
  const { status } = res;

  if (status >= 200 && status < 300) {
    return res.data;
  }

  return Promise.reject(res);
};

export default async (
  url: string,
  {
    body,
    method = 'post',
    ...opts
  }: AxiosRequestConfig & { body: KoaNext.IBody },
): Promise<KoaNext.IResponse> => {
  const { headers: h } = opts;
  const headers = {
    'content-type': 'application/json; charset=utf-8',
    ...h,
  };

  const config: AxiosRequestConfig = {
    ...defaultConfig,
    ...opts,
    headers,
  };

  const baseRequest: AxiosInstance = axios.create(config);

  if (isNode) {
    url = `${publicRuntimeConfig.api}${url}`;
    logger.info(JSON.stringify(headers));
    logger.info(url);
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
      return Promise.reject(error);
    });
};
