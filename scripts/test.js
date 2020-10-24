process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

require('react-scripts/config/env');

const patchModule = require('./utils/cache');

const fs = require('fs-extra');
const path = require('path');

const chalk = require('chalk');
const appPath = require('react-scripts/config/paths').appPath;
const webpackMonkeyPath = path.resolve(appPath, 'webpack.monkey.js');

require('react-scripts/config/jest/babelTransform.js')

if (fs.existsSync(webpackMonkeyPath)) {
    console.log(chalk.yellow('WARNING! .babelrc file is enabled!'));
    const babelJest = require('babel-jest');

  const hasJsxRuntime = (() => {
    if (process.env.DISABLE_NEW_JSX_TRANSFORM === 'true') {
      return false;
    }

    try {
      require.resolve('react/jsx-runtime');
      return true;
    } catch (e) {
      return false;
    }
  })();

    patchModule('react-scripts/config/jest/babelTransform.js', babelJest.createTransformer({
        presets: [
          require.resolve('babel-preset-react-app'),
          {
            runtime: hasJsxRuntime ? 'automatic' : 'classic',
          },
        ],
        babelrc: true,
        configFile: false,
    }));
}

require('react-scripts/scripts/test');