const path    = require('path');
const webpack = require('webpack');
const colors  = require('colors');

const config  = require('./cover/webpack.config');

config.entry = './cover/src/main.js';

config.devServer = {
  contentBase: './cover/src/',
  historyApiFallback: true,
  noInfo: true,
  setup: (app) => {
    try {
      const apiConfig = require('./dist/server.config');
      apiConfig.configureApp(app);
    } catch (err) {
      console.log('WARN'.yellow + ': Server config not found. Did you build it?');
      console.log('WARN'.yellow + ': Skipping server config...');
    }
  },
  port: 3001
};

module.exports = config;