const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const PurifyCSSPlugin = require("purifycss-webpack");
const glob = require("glob");
const autoprefixer = require("autoprefixer");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = merge(common, {
  output: {
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "dist")
  },
  devtool: "source-map",
  plugins: [
    new PurifyCSSPlugin({
      paths: glob.sync(path.join(__dirname, "src/*.html")),
      minimize: true,
      purifyOptions: {
        whitelist: []
      }
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        minimize: true,
        postcss: [autoprefixer()]
      }
    }),
    new UglifyJsPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  ]
});
