const fs = require('fs');
const path = require('path');

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

require('react-scripts/config/env');

const chalk = require('chalk');
const appPath = require('react-scripts/config/paths').appPath;
const webpackMonkeyPath = path.resolve(appPath, 'webpack.monkey.js');
const webpackConfig = require('react-scripts/config/webpack.config.dev');

if (fs.existsSync(webpackMonkeyPath)) {
    console.log(chalk.yellow('WARNING! You are using modified webpack config!'));
    require(webpackMonkeyPath)(webpackConfig, true);
}
require('react-scripts/scripts/start');
