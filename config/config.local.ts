import * as withTypescript from '@zeit/next-typescript';
const conf = withTypescript();

const config = {
  next: {
    dir: './client',
    dev: true,
    conf: {
      pageExtensions: ['tsx', 'jsx', 'js'],
      ...conf
    }
  }
};

export default config;
