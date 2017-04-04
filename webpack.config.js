const rootDir = __dirname
require('webpack')
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

console.log('ROOTDIR::', rootDir);

module.exports = {
  entry: './src/browser/main.js',
  module: {
    rules: [
      {test:/\.js$/, include: `${rootDir}/src/browser`, loaders: ['babel-loader']},
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
  externals: {
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  plugins: [HTMLWebpackPluginConfig, new ExtractTextPlugin("styles.css")]
}
