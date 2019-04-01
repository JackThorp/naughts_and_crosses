var webpack = require('webpack');
var path    = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');


var BUILD_DIR = path.resolve(__dirname, './build');
var APP_DIR   = path.resolve(__dirname, './src/client');

const config = {

  entry: {
    main: path.join(APP_DIR, 'index.js')
  },

  output: {
    filename: 'bundle.js',
    path: BUILD_DIR
  },

  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          "style-loader", // parse and understand sass files. Bring them into dep tree.
          "css-loader",   // translate sass into css
          "sass-loader"   // inject the css into index 
        ]
      },
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            presets: ['@babel/preset-env'] // Transpiles JSX and ES6
          }
        }] 
      }
    ] 
  },

  plugins: [
    // Automatically writes js and stylesheet bundles into the index
    new HtmlWebpackPlugin({ 
      template: './src/index.html',
      filename: './index.html'
    })
  ],

  devServer: {
    open: 'Google Chrome',
    contentBase: BUILD_DIR,
    historyApiFallback: true,
    hot: true,
  }
}

module.exports = config;
