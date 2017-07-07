# Code snippets for create-react-app 1.x.x
useful codes you can copy and use in webpack.monkey.js file.

In real project I copy some of them in other file and use require function:

## webpack plugin

Add webpack plugin
```js
function addPlugin(config, plugin) {
    config.plugins.push(plugin);
}
```
## Find Rule

```js
function findRule(webpackConfig, callback) {
    const index = webpackConfig.module.rules.findIndex(callback);
    if (index === -1) throw Error('Loader not found');
    return webpackConfig.module.rules[index];
}
```

## Add Babel plugin
requirement: `findRule`
```js
function addBabelPlugins(webpackConfig, plugins) {
    const babelRule = findRule(webpackConfig, function (rule) {
        return rule.loader && rule.loader.endsWith('babel-loader/lib/index.js');
    });
    babelRule.options.plugins = (babelRule.options.plugins || []).concat(plugins);
}
```

## addLoader
```js
function addRule(webpackConfig, rule) {
    webpackConfig.module.rules.push(rule);
}
```

## addExclude
cra use file-loader for all unknown files. 
requirement: `findRule`
```js
function addExclude(webpackConfig, regex) {
    const excludeRule = findRule(webpackConfig, function(rule) {
        return rule.loader && rule.loader.endsWith('file-loader/index.js')
    });
    excludeRule.exclude.push(regex);
}
```