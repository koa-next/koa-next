import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import c from './config';

const conf = {
  webpack: (config: any, options: any) => {
    const { dev, isServer } = options;

    if (isServer) {
      const antStyles = /antd\/.*?\/style\/css.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) {
            return callback();
          }
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      });
    }

    // only build in node
    config.externals = config.externals || [];
    config.externals.push('log4js');

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
          },
        },
        'sass-loader',
      ],
    });

    const cssLoader = {
      loader: isServer ? 'css-loader/locals' : 'css-loader',
      options: {
        modules: true,
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
            },
          },
          sassLoader,
          postcssLoader,
        ].filter(Boolean);

    options.defaultLoaders.sass = loaders;

    config.module.rules.push({
      test: /\.(scss|sass)$/,
      use: options.defaultLoaders.sass,
      include: [path.resolve(__dirname, './client/pages')],
    });

    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: dev
          ? 'static/chunks/[name].css'
          : 'static/chunks/[name].[contenthash:8].css',
        chunkFilename: dev
          ? 'static/chunks/[name].chunk.css'
          : 'static/chunks/[name].[contenthash:8].chunk.css',
      }),
    );

    config.module.rules.push({
      test: /\.(png|jpg|gif|svg)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: '[hash].[ext]',
            publicPath: `${options.config.assetPrefix}/_next/static/images/`,
            outputPath: `${isServer ? '../' : ''}static/images/`,
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.(eot|ttf|woff|woff2|otf|ttc)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            publicPath: `${options.config.assetPrefix}/_next/static/fonts/`,
            outputPath: `${isServer ? '../' : ''}static/fonts/`,
          },
        },
      ],
    });

    return config;
  },
};

module.exports = {
  pageExtensions: ['tsx', 'jsx', 'js', 'ts'],
  ...c.next.conf,
  ...conf,
};
