const rootDir = __dirname
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const jsonLoader = require('json-loader');
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

console.log('ROOTDIR::', rootDir);

module.exports = {
  entry: './src/browser/main.js',
  module: {
    loaders: [
      {test:/\.js$/, include: `${rootDir}/src/browser`, loaders: ['babel-loader']},
      {include:  /\.json$/, loaders: ['json-loader']}
    ]
  },
  output: {
    filename: 'bundle.js',
    path: `${rootDir}/public/dist`
  },
  plugins: [HTMLWebpackPluginConfig]
}
