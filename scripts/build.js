var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var appPath = require('react-scripts/config/paths').appPath;

process.env.NODE_ENV = 'production';

require('dotenv').config({silent: true});

var webpackMonkeyPath = path.resolve(appPath, 'webpack.monkey.js');
var webpackConfig = require('react-scripts/config/webpack.config.prod');

if (fs.existsSync(webpackMonkeyPath)) {
    console.log(chalk.yellow('WARNING! You are using modified webpack config!'));
    require(webpackMonkeyPath)(webpackConfig, false);
}
require('react-scripts/scripts/build');
