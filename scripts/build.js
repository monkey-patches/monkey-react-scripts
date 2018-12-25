process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

require('react-scripts/config/env');

const patchModule = require('./utils/cache');

const fs = require('fs-extra');
const path = require('path');

const chalk = require('chalk');
const appPath = require('react-scripts/config/paths').appPath;
const webpackMonkeyPath = path.resolve(appPath, 'webpack.monkey.js');

const originalConfigFactory = require('react-scripts/config/webpack.config');

if (fs.existsSync(webpackMonkeyPath)) {
    console.log(chalk.yellow('WARNING! You are using modified webpack config!'));
    const configPatch = require(webpackMonkeyPath);
    patchModule('react-scripts/config/webpack.config', (...args) => {
        const webpackConfig = originalConfigFactory(...args);
        return configPatch(webpackConfig, false) || webpackConfig;
    });
}

require('react-scripts/scripts/build');
