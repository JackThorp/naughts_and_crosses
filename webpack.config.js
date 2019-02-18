var webpack = require('webpack');
var path    = require('path');

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
        use: [{
          loader: "style-loader" // creates style nodes from JS strings??
        },
        {
          loader: "css-loader" //translates css into CommonJS
        },
        {
          loader: "sass-loader" //  compiles sass to css 
        }]
      },
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader",
          /*options: {
            cacheDirectory: true,
            presets: ['react', 'es2015'] // Transpiles JSX and ES6
          }
          */
        }] 
      }
    ] 
  }
}

module.exports = config;