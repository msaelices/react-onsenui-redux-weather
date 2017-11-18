var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var browserTargets = [
  '> 1%',
  'iOS >= 8.0',
  'Android >= 4.4',
  'Chrome >= 30',
  'Safari >= 9',
  'Firefox ESR',
  'Opera 12.1'
];

var babelOptions = {
  babelrc: false,
  presets: ['es2015', 'stage-2', 'react']
};

module.exports = {
  watch: process.env.WEBPACK_WATCH === 'true',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './www'),
    publicPath: '',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 1 }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('postcss-smart-import')(),
                  require('postcss-url')(),
                  require('postcss-base64')({ extensions: ['.svg'], root: 'src' }),
                  require('postcss-cssnext')({ browsers: browserTargets })
                ]
              }
            }
          ]
        })
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: babelOptions,
        exclude: path.join(__dirname, 'node_modules')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.HotModuleReplacementPlugin()
  ]
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}
