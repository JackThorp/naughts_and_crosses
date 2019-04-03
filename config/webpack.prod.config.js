var merge = require('webpack-merge');

// Plugins
var OptimizeCssAssets = require('optimize-css-assets-webpack-plugin');
var UglifyJsPlugin    = require('uglify-js-webpack-plugin');
var Visualiser        = require('webpack-visualizer-plugin');

var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var baseConfig  = require('./webpack.base.config');

module.exports = merge(baseConfig, {
  
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        // The order webpack uses loaders is from last to first!
        use: [
          MiniCssExtractPlugin.loader, // minimise and attach as style sheet          
          "css-loader",   // translate sass into css
          "sass-loader"   // parse and understand sass files. Bring them into dep tree.
        ]
      },
    ]
  },

  plugins: [
    // Minify / optimise css. Need to make sure it works with the other loaders
    new OptimizeCssAssets(),

    // Generates a HTML graph showing size of various included modules.:
    new Visualiser({ filename: './statistics.html'})
  ],

  optimization: {
    runtimeChunk: 'single',
      
    // Puts libraries from node modules into individual files. 
    // This allows browser to cache vendors and reduce download size over time..
    // This is interesting. Need to read up more
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
      
    minimizer: [new UglifyJsPlugin()],
  }
}

