# Code snippets for create-react-app 0.9.x

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