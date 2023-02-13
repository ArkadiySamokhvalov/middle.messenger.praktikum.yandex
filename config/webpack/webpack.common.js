/* eslint-disable @typescript-eslint/no-var-requires */
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');

module.exports = {
  entry: path.resolve(rootDir, 'src/index.ts'),
  output: {
    path: path.resolve(rootDir, 'dist'),
    filename: '[name].bundle.[contenthash].js',
  },
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      handlebars: 'handlebars/dist/handlebars.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(rootDir, 'src/index.html'),
      inject: 'body',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(rootDir, 'static'),
          to: path.resolve(rootDir, 'dist'),
        },
      ],
    }),
  ],
};
