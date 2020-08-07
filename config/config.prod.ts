const config = {
  next: {
    dev: false,
    dir: './client',
    quiet: true,
    conf: {
      publicRuntimeConfig: {
        api: 'http://127.0.0.1:3000',
      },
      distDir: '_next',
      assetPrefix: 'http://127.0.0.1:8080',
    },
  },
};

export default config;
