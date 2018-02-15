const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const PurifyCSSPlugin = require('purifycss-webpack');
const glob = require('glob');

module.exports = merge(common, {
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  plugins: [
    new PurifyCSSPlugin({
      paths: glob.sync(path.join(__dirname, 'src/*.html')),
      minimize: false,
      purifyOptions: {
        whitelist: []
      }
    })
  ]
});
