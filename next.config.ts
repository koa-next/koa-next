import withTypescript from '@zeit/next-typescript';
const conf = withTypescript();

module.exports = {
  pageExtensions: ['tsx', 'jsx', 'js'],
  ...conf
};
