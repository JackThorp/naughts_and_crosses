var webpack = require('webpack');
var merge   = require('webpack-merge');
var path    = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, '../build');
var APP_DIR   = path.resolve(__dirname, '../src/client');

module.exports = {
  
  entry: ['@babel/polyfill', path.join(APP_DIR, 'index.js')],

  output: {
    filename: 'bundle.js',
    path: BUILD_DIR
  },

  module: {
    rules: [
      {
         test: /\.(jsx|js)$/,
         exclude: /node_modules/,
         use: {
           loader: "babel-loader",
         } 
      }
    ] 
  },

  plugins: [
    // Automatically writes js and stylesheet bundles into the index
    new HtmlWebpackPlugin({ 
      template: './src/index.html',
      filename: './index.html'
    })
  ]

};

