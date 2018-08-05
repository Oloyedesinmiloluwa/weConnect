// const webpack = require('webpack');
// // const path = require('path');
// import path from 'path';

// const BUILD_DIR = path.resolve(__dirname, 'client/public');
// const APP_DIR = path.resolve(__dirname, 'client');

// const config = {
//   mode: 'development',
//   entry: `${APP_DIR}/index.jsx`,
//   output: {
//     path: '/',
//     filename: 'bundle.js'
//   },
//   resolve: {
//     extensions: ['.js', '.jsx', '.json']
//   },
//   module: {
//     rules: [
//       {
//         test: /\.jsx?$/,
//         include: APP_DIR,
//         loaders: ['babel-loader']
//       }
//     ]
//   }
// };

// module.exports = config;

let webpack = require('webpack');
let path = require('path');
// import path from 'path';
// import webpack from 'webpack';
module.exports = {
// export default {
  // devtools: 'eval-source-map',
  mode: 'development',
  entry: path.resolve(__dirname, 'client/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'server/src'),
    filename: 'bundle.js'
  },
  // plugins: [
  //   new webpack.NoErrorsPlugin(),
  //   new webpack.optimize.OccurenceOrderPlugin(),
  //   new webpack.HotModuleReplacementPlugin()
  // ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'client')
        ],
        loader: 'babel',
        query: {
          // cacheDirectory: 'babel_cache',
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: [ '', '.js', '.jsx', '.json' ]
  }
};

