# Code snippets for create-react-app 1.x.x
useful codes you can copy and use in webpack.monkey.js file.

In real project I copy some of them in other file and use require function:

## webpack plugin

Add webpack plugin
```js
function addPlugin(webpackConfig, plugin) {
    webpackConfig.plugins.push(plugin);
}
```
## Find Rule

```js
function findRule(webpackConfig, callback) {
    const rules = webpackConfig.module.rules[1].oneOf;
    const index = rules.findIndex(callback);
    if (index === -1) throw Error('Loader not found');
    return rules[index]
}
```

## Add Babel plugin
requirement: `findRule`
```js
function addBabelPlugins(webpackConfig, plugins) {
    // find babel rule
    const babelRule = findRule(webpackConfig, (rule) => {
        return ('' + rule.test === '' + /\.(js|jsx|mjs)$/)
    });
    babelRule.options.plugins = (babelRule.options.plugins || []).concat(plugins);
}
```

## add Rule
```js
function addRule (webpackConfig, rule) {
    const rules = webpackConfig.module.rules[1].oneOf;
    rules.splice(rules.length - 1, 0, rule); // add before exclude rule
}
```
