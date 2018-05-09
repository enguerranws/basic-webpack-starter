const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const PostCSSCSSNext = require('postcss-cssnext')();
const PostCSSCSSO = require('postcss-csso');
const extractSass = new ExtractTextPlugin('../css/app.min.css');

const CSSPlugins = [
  PostCSSCSSNext,
  PostCSSCSSO,
];

const JSPlugins = [
  new UglifyJSPlugin(),
  extractSass
];

module.exports = {
  entry: './build/js/index.js',
  output: {
    filename: 'app.min.js',
    path: path.resolve('./dist/', 'js'),
  },
  plugins: JSPlugins,
  module: {
    rules: [      
      {
        test: /\.js$/,
        loaders: ['babel-loader?cacheDirectory=true'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: extractSass.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: CSSPlugins,
              },
            },
          ],
        }),
      },     
    ],
  },
};
