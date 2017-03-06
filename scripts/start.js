var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var appPath = require('react-scripts/config/paths').appPath;

process.env.NODE_ENV = 'development';

require('dotenv').config({silent: true});

var webpackMonkeyPath = path.resolve(appPath, 'webpack.monkey.js');
var webpackConfig = require('react-scripts/config/webpack.config.dev');

if (fs.existsSync(webpackMonkeyPath)) {
    console.log(chalk.yellow('WARNING! You are using modified webpack config!'));
    require(webpackMonkeyPath)(webpackConfig, true);
}
require('react-scripts/scripts/start');
