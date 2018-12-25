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
    const rules = webpackConfig.module.rules[3].oneOf;
    const index = rules.findIndex(callback);
    if (index === -1) throw Error('Loader not found');
    return rules[index]
}
```

## find Babel rule
requirement: `findRule`
```js
function findBabelRule(webpackConfig, plugins) {
    // find babel rule
    const babelRule = findRule(webpackConfig, (rule) => {
        return ('' + rule.test === '' + /\.(js|jsx)$/)
    });
    return babelRule;
}
```
