/* eslint-disable @typescript-eslint/no-var-requires */
const baseConfig = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');

module.exports = merge([
  baseConfig,
  {
    mode: 'production',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/i,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              },
            },
            {
              loader: 'ts-loader',
              options: {
                configFile: path.resolve(rootDir, 'tsconfig.prod.json'),
              },
            },
          ],
          exclude: ['/node_modules/'],
        },
        {
          test: /\.(s(a|c)ss)$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
      ],
    },
    plugins: [new MiniCssExtractPlugin()],
  },
]);
