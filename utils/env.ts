export const isPro = process.env.NODE_ENV === 'production';

export const isNode = typeof process === 'object' &&
  Object.prototype.toString.call(process) === '[object process]' || false;

