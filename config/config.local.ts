import * as withTypescript from '@zeit/next-typescript';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as path from 'path';
import * as webpack from 'webpack';

const conf = withTypescript({
  webpack(config, options) {
    const { dev, isServer } = options;

    config.module.rules.push({
      test: /\.css$/,
      include: [
        path.resolve(__dirname, '../client/styles'),
        path.resolve(__dirname, '../node_modules/'),
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
      include: [path.resolve(__dirname, '../client/styles')],
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
        'sass-loader',
      ].filter(Boolean);

    options.defaultLoaders.sass = loaders;

    config.module.rules.push({
      test: /\.(scss|sass)$/,
      use: options.defaultLoaders.sass,
      include: [
        path.resolve(__dirname, '../client/pages'),
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

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NEXT_ENV': JSON.stringify(process.env.NEXT_ENV),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      })
    );

    return config;
  },
});

export default {
  next: {
    dir: './client',
    dev: true,
    conf: {
      pageExtensions: ['tsx', 'jsx', 'js', 'ts'],
      ...conf
    }
  }
};
