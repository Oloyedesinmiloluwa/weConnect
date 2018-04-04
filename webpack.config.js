const webpack = require('webpack');
// const path = require('path');
import path from 'path';

const BUILD_DIR = path.resolve(__dirname, 'client/public');
const APP_DIR = path.resolve(__dirname, 'client');

const config = {
  mode: 'development',
  entry: `${APP_DIR}/index.jsx`,
  output: {
    path: '/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: APP_DIR,
        loaders: ['babel-loader']
      }
    ]
  }
};

module.exports = config;
