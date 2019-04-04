import axios from 'axios';
import qs from 'querystring';
import { isNode } from '../../utils/env';

interface Iprops {
  url: string;
  body: object;
  method?: string;
  opts?: any;
}

const checkStatus = res => {
  const { status } = res;

  if (status >= 200 && status < 300) {
    return res.data;
  }

  return Promise.reject(res);
};

export default ({ url, body, method = 'post', opts = {} }: Iprops) => {
  const { headers: h } = opts;
  const headers = {
    'content-type': 'application/json; charset=utf-8',
    'X-Requested-With': 'XMLHttpRequest',
    'csrf-token': isNode ? h && h['csrf'] : window.csrf,
  };

  const baseRequest = axios.create({headers});

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
    .catch(error => {
      throw error.response;
    });
};

