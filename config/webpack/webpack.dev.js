/* eslint-disable @typescript-eslint/no-var-requires */
const baseConfig = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');

module.exports = merge([
  baseConfig,
  {
    mode: 'development',
    devServer: {
      static: {
        directory: path.join(rootDir, 'dist'),
      },
      port: 3000,
      historyApiFallback: true,
    },
    devtool: 'eval-source-map',
    optimization: {
      minimize: false,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/i,
          use: [
            {
              loader: 'ts-loader',
              options: {
                configFile: path.resolve(rootDir, 'tsconfig.json'),
              },
            },
          ],
          exclude: ['/node_modules/'],
        },
        {
          test: /\.(s(a|c)ss)$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
  },
]);
