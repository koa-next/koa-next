// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  // tslint:disable-next-line:no-empty
  require.extensions['.css'] = () => { };
}

const config = {
  keys: ['123456'],
};

export default config;
