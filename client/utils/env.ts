export const isPro: boolean = process.env.NODE_ENV === 'production';

export const isNode: boolean =
  (typeof process === 'object' &&
    Object.prototype.toString.call(process) === '[object process]') ||
  false;
