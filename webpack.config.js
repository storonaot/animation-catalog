const path = require('path')
const webpack = require('webpack')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')

const vars = require('postcss-simple-vars')
const postcssSVG = require('postcss-svg')

const postCssPlugins = [
  require('precss'),
  require('postcss-responsive-type'),
  require('postcss-size'),
  vars({
    variables() {
      return require('./frontend/stylesheets/variables')
    }
  }),
  postcssSVG({
    paths: ['./frontend/images/project'],
    ei: false,
    svgo: true
  })
]

module.exports = {
  context: path.join(__dirname, '/frontend'),
  entry: {
    styles: './stylesheets/manifest.js',
    common: './javascripts/entry.js'
  },
  output: {
    path: path.join(__dirname, './public'),
    publicPath: '/',
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[id].bundle.js'
  },
  watch: true,
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      React: 'react',
      _: 'lodash'
    })
    // new ExtractTextPlugin('[name].css', { allChunks: true })
  ],
  resolve: {
    modulesDirectories: ['node_modules', 'frontend/components'],
    extensions: ['', '.js', '.css', '.sss', '.pcss', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'react-hot!babel-loader',
        exclude: [/node_modules/, /public/]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/, /public/]
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.pcss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader?parser=sugarss'
        ]
      },
      {
        test: /\.sss$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader?parser=sugarss'
        ]
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        loader: 'url-loader?limit=102400&name=[path][name].[ext]?[hash:base64]'
      },
    ]
  },
  babel: {
    presets: ['es2015', 'react']
  },
  postcss() {
    return postCssPlugins
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '*': 'http://localhost:3000'
    },
    historyApiFallback: true,
    hot: true
  }
}
