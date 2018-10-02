process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const fs = require('fs-extra');
const path = require('path');

require('react-scripts/config/env');

const chalk = require('chalk');
const appPath = require('react-scripts/config/paths').appPath;
const webpackMonkeyPath = path.resolve(appPath, 'webpack.monkey.js');
const webpackConfig = require('react-scripts/config/webpack.config.prod');

if (fs.existsSync(webpackMonkeyPath)) {
    console.log(chalk.yellow('WARNING! You are using modified webpack config!'));
    require(webpackMonkeyPath)(webpackConfig, false);
}
require('react-scripts/scripts/build');
