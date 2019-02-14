import * as withTypescript from '@zeit/next-typescript';
import * as withSass from '@zeit/next-sass';

const conf = withTypescript(withSass({
  cssModules: true
}));

module.exports = {
  pageExtensions: ['tsx', 'jsx', 'js', 'ts'],
  ...conf
};
