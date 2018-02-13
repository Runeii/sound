'use strict'
const pkg = require('../package')
const platform = process.env.TARGET_ENV

module.exports = {
  title: 'sound',
  // Options for webpack-dev-server
  // See https://webpack.js.org/configuration/dev-server
  devServer: {
    host: '0.0.0.0',
    port: 4000
  },
  // when you use electron please set to relative path like ./
  // otherwise only set to absolute path when you're using history mode
  publicPath: './',
  platform: platform,
  cssModules: true,
  jsx: true
}
