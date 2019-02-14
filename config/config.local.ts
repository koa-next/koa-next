import * as withTypescript from '@zeit/next-typescript';
import * as withSass from '@zeit/next-sass';

const conf = withTypescript(withSass({
  cssModules: true
}));

const config = {
  next: {
    dir: './client',
    dev: true,
    conf: {
      pageExtensions: ['tsx', 'jsx', 'js', 'ts'],
      ...conf
    }
  }
};

export default config;
