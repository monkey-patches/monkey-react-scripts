# Code snippets for create-react-app 0.9.x
useful codes you can copy and use in webpack.monkey.js file.

In real project I copy some of them in other file and use require function:

## webpack plugin

Add webpack plugin
```js
function addPlugin(config, plugin) {
    config.plugins.push(plugin);
}
```

## Find loader

```js
function findLoader(config, callback) {
    var index = config.module.loaders.findIndex(callback);
    if (index === -1) throw Error('Loader not found');
    return config.module.loaders[index];
}
```

## Add Babel plugin
requirement: `findLoader`
```js
function addBabelPlugins(webpackConfig, plugins) {
    var babelLoader = findLoader(webpackConfig, function (loader) {
        return loader.loader === 'babel'
    });
    babelLoader.query.plugins = (babelLoader.query.plugins || []).concat(plugins);
}

```
## addLoader
```js
function addLoader(webpackConfig, loader) {
    webpackConfig.module.loaders.push(loader);
}
```

## addExclude
cra use url loader for all unknown files. 
requirement: `findLoader`
```js
function addExclude(webpackConfig, regex) {
    const loader = findLoader(webpackConfig, function(rule) {
        return rule.loader === 'url'
    });
    loader.exclude.push(regex);
}
```

## create extract text plugin

```js
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const paths = require('react-scripts/config/paths');
const publicPath = paths.servedPath;
const shouldUseRelativeAssetPaths = publicPath === './';
const cssFilename = 'static/css/[name].[contenthash:8].css';


const createTextExtractor = function (fallback, use) {
    const extractTextPluginOptions = {};
    if (shouldUseRelativeAssetPaths) {
        extractTextPluginOptions.publicPath = Array(cssFilename.split('/').length).join('../')
    }

    return ExtractTextPlugin.extract(fallback, use, extractTextPluginOptions);
};

```

## scss config
requirement: `createTextExtractor`

```js
function getScssLoader(isDevelopment) {

    if (isDevelopment) {
        return {
            test: /\.scss$/,
            loader: 'style!css?importLoaders=1!postcss!sass'
        };
    }
    return {
        test: /\.scss$/,
        loader: createTextExtractor('style', 'css?importLoaders=1!postcss!sass'),
    };
}

```
