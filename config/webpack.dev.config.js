var webpack = require('webpack');
var merge   = require('webpack-merge');
var path    = require('path');

var baseConfig = require('./webpack.base.config');

var BUILD_DIR = path.resolve(__dirname, '../build');

module.exports = merge(baseConfig, {

  module: {
    rules: [
      {
         test: /\.(css|scss)$/,
         // The order webpack uses loaders is from last to first!
         use: [
           "style-loader", // inject the css into index by adding it inline between <style> tags. Good for dev but not prod.
           "css-loader",   // translate sass into css
           "sass-loader"   // parse and understand sass files. Bring them into dep tree.
         ]
      },
    ]
  },

  devServer: {
    open: 'Google Chrome',
    contentBase: BUILD_DIR,
    historyApiFallback: true,
    hot: true,
  }
});

