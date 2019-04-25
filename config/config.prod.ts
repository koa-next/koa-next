const config = {
  next: {
    dev: false,
    dir: './client',
    quiet: true,
    conf: {
      publicRuntimeConfig: {
        api: 'http://127.0.0.1:3000'
      },
    }
  }
};

export default config;
