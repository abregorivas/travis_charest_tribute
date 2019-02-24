const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: ['./src/index.js', './src/scss/main.scss']
  },
  module: {
    rules: [
      {
        test: /(\.css|\.s[ac]ss)$/,
        exclude: /node_modules/,
        use: ['css-hot-loader'].concat(
          ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader', options: { importLoaders: 2 } },
              { loader: 'postcss-loader', options: { sourceMap: true } },
              { loader: 'sass-loader', options: { sourceMap: true } }
            ]
          })
        )
      },
      {
        test: /\.(svg|ttf|woff|woff2)$/,
        use: 'file-loader'
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'images/',
              publicPath: '/'
            }
          },
          {loader:'img-loader'}
        ]
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist/*.*'], { root: __dirname, verbose: true, dry: false }),
    new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }),
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new ExtractTextPlugin({ filename: '[name].css', disable: false, allChunks: true }),
    new webpack.optimize.CommonsChunkPlugin({ names: ['vendor', 'manifest'] })
  ]
};
