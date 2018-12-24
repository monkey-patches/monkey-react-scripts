process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

require('react-scripts/config/env');

const fs = require('fs-extra');
const path = require('path');

const chalk = require('chalk');
const appPath = require('react-scripts/config/paths').appPath;
const webpackMonkeyPath = path.resolve(appPath, 'webpack.monkey.js');

const originalConfigFactory = require('react-scripts/config/webpack.config');

if (fs.existsSync(webpackMonkeyPath)) {
    console.log(chalk.yellow('WARNING! You are using modified webpack config!'));
    const configPatch = require(webpackMonkeyPath)
    const configModule = require.cache[require.resolve('react-scripts/config/webpack.config')];
    configModule.exports = (...args) => {
        const webpackConfig = originalConfigFactory(...args);
        return configPatch(webpackConfig, false) || webpackConfig;
    };
}

require('react-scripts/scripts/build');
