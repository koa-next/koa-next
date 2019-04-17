import * as withTypescript from '@zeit/next-typescript';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as path from 'path';

const conf = withTypescript({
  webpack(config, options) {
    const { dev, isServer } = options;
    // only build in node
    config.externals.push('log4js');

    if (!dev) {
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();

        if (entries['main.js'] && !entries['main.js'].includes('@babel/polyfill')) {
          entries['main.js'].unshift('@babel/polyfill');
        }

        return entries;
      };
    }

    if (!isServer) {
      config.optimization.splitChunks.cacheGroups.styles = {
        name: 'styles',
        test: new RegExp(`\\.+(${['css', 'scss'].join('|')})$`),
        chunks: 'all',
        enforce: true,
      };
    }

    config.module.rules.push({
      test: /\.css$/,
      include: [
        path.resolve(__dirname, './client/styles'),
        path.resolve(__dirname, './node_modules/'),
      ],
      use: [
        dev && 'extracted-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            modules: false,
            url: true,
            import: false,
          },
        },
      ].filter(Boolean),
    });

    config.module.rules.push({
      test: /\.(scss|sass)$/,
      include: [path.resolve(__dirname, './client/styles')],
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            modules: false,
            url: true,
            import: false,
          },
        },
        'sass-loader',
      ],
    });

    const cssLoader = {
      loader: isServer ? 'css-loader/locals' : 'css-loader',
      options: {
        modules: true,
        minimize: !dev,
        sourceMap: dev,
        camelCase: true,
        localIdentName: '[local]_[hash:base64:5]',
        importLoaders: 1,
        namedExport: !isServer || undefined,
      },
    };

    const sassLoader = { loader: 'sass-loader' };
    const postcssLoader = { loader: 'postcss-loader' };

    const loaders = isServer
      ? [cssLoader, sassLoader]
      : [
        dev && 'extracted-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[local]_[hash:base64:5]',
            url: true,
            import: false,
          },
        },
        sassLoader,
        postcssLoader
      ].filter(Boolean);

    options.defaultLoaders.sass = loaders;

    config.module.rules.push({
      test: /\.(scss|sass)$/,
      use: options.defaultLoaders.sass,
      include: [
        path.resolve(__dirname, './client/pages'),
      ],
    });

    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: dev
          ? 'static/chunks/[name].css'
          : 'static/chunks/[name].[contenthash:8].css',
        chunkFilename: dev
          ? 'static/chunks/[name].chunk.css'
          : 'static/chunks/[name].[contenthash:8].chunk.css',
      })
    );

    config.module.rules.push({
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[hash].[ext]',
          outputPath: 'static/img/',
          publicPath: '../img/',
        },
      }],
    });

    config.module.rules.push({
      test: /\.(eot|ttf|woff|woff2|otf|ttc)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          outputPath: 'static/fonts/',
          publicPath: '../fonts/',
        },
      }],
    });

    return config;
  },
});

module.exports = {
  pageExtensions: ['tsx', 'jsx', 'js', 'ts'],
  ...conf
};
