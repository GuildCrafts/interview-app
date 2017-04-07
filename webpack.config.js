const path = require('path')
const rootDir = __dirname
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
require('json-loader')
require('css-loader')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: rootDir + '/src/browser/index.html',
  filename: 'index.html',
  inject: 'body',
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true
  }
})

module.exports = {
  context: path.join(__dirname),
  entry: [
    './src/browser/main.js'
  ],
  module: {
    rules: [
      {
        test:/\.js$/, include: `${rootDir}/src/browser`,
        loaders: ['react-hot-loader', 'babel-loader']
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {include:  /\.json$/, loaders: ['json-loader']}
    ],
  },
  output: {
    filename: 'bundle.js',
    path: `${rootDir}/public/dist`
  },

  plugins:
  [
    new ExtractTextPlugin("styles.css"),
    HTMLWebpackPluginConfig
  ]
}
