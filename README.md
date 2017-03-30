# monkey-react-scripts
Monkey react script runner: Customize react-scripts webpack config without ejection or fork

## Usage
- use create-react-app and create your project, [more-detail][create-react-app]
```
npm install -g create-react-app

create-react-app my-app
cd my-app/
```

- install monkey-react-scripts

```
npm install monkey-react-scripts --save-dev --save-exact
```

- create `webpack.monkey.js` in root of your project. you can modify webpack config here.
```js
module.exports = function (webpackConfig, isDevelopment) {
    // mutate webpackConfig
};
```

- edit `package.json` and replace scripts
```
  "scripts": {
    "start": "monkey-react-scripts start",
    "build": "monkey-react-scripts build",
    "test": "monkey-react-scripts test --env=jsdom"
  }
```

## Snippets
You can use [snippets](snippets/) if you want.

snippets:
- `addPlugin`
- `findLoader`
- `addBabelPlugins`

## Example 
### Webpack Visualizer
I love visualization so I add [webpack-visualizer-plugin][webpack-visualizer] to my project
- install plugin:
```
npm install webpack-visualizer-plugin --save-dev
```
- add plugin to config (only at build)
```js
// webpack.monkey.js
var Visualizer = require('webpack-visualizer-plugin');

module.exports = function (webpackConfig, isDevelopment) {
    if (!isDevelopment) {
        webpackConfig.plugins.push(new Visualizer());
    }
};
```
- build
```
$ npm run build
// some output
$ tree build
build
├── asset-manifest.json
├── favicon.ico
├── index.html
├── static
│   ├── css
│   │   ├── main.9a0fe4f1.css
│   │   └── main.9a0fe4f1.css.map
│   ├── js
│   │   ├── main.373f9afc.js
│   │   └── main.373f9afc.js.map
│   └── media
│       └── logo.5d5d9eef.svg
└── stats.html                      <-- new file
```
### Decorator support
If you love decorators, you can add decorator support:
- install decorator plugin
```
npm install --save-dev babel-plugin-transform-decorators-legacy
```
- edit `webpack.monkey.js` like this (copy `findLoader`, `addBabelPlugins` from [snippets](snippets/cra-0.9.x.md)):
```js
function findLoader(config, callback) {
    var index = config.module.loaders.findIndex(callback);
    if (index === -1) throw Error('Loader not found');
    return config.module.loaders[index];
}

function addBabelPlugins(webpackConfig, plugins) {
    var babelLoader = findLoader(webpackConfig, function (loader) {
        return loader.loader === 'babel'
    });
    babelLoader.query.plugins = (babelLoader.query.plugins || []).concat(plugins);
}

module.exports = function (webpackConfig, isDevelopment) {
    addBabelPlugins(webpackConfig, [
        require.resolve('babel-plugin-transform-decorators-legacy')
    ]);
};
```
related issues: [#107][107], [#167][167], [#214][214], [#309][309], [#411][411], [#1357][1357]

### Relay support
- install `babel-relay-plugin`:
```
npm install --save-dev babel-relay-plugin
```
- add `relayPlugin.js` file:
```js
const getBabelRelayPlugin = require('babel-relay-plugin');
const schemaData = require('./graphql.schema.json');
const relayPlugin = getBabelRelayPlugin(schemaData.data);
module.exports = relayPlugin;
```
- edit `webpack.monkey.js` like this:
```js
/* copy findLoader, addBabelPlugins from decorator example */
module.exports = function (webpackConfig, isDevelopment) {
    addBabelPlugins(webpackConfig, [
        require.resolve('./relayPlugin.js')
    ]);
};
```
related issues: [#462][462], [#662][662], [#900][900] 
## TODOs
- [ ] <del>add helpers</del> snippets
  - [x] addPlugin
  - [x] findLoader
  - [x] addBabelPlugins
  - [ ] extract text webpack plugin
  - [ ] addExclude
  - [ ] addLoader
- [ ] customize test runner (jest)
- [ ] add more example
  - [ ] postcss
  - [ ] scss support
  - [x] decorator support
  - [x] relay support

## Thanks
@svrcekmichal for [configurable-react-scripts][configurable-react-scripts]

[create-react-app]: https://github.com/facebookincubator/create-react-app#tldr
[webpack-visualizer]: https://github.com/chrisbateman/webpack-visualizer
[configurable-react-scripts]: https://github.com/svrcekmichal/configurable-react-scripts

[107]: https://github.com/facebookincubator/create-react-app/issues/107
[167]: https://github.com/facebookincubator/create-react-app/issues/167
[214]: https://github.com/facebookincubator/create-react-app/issues/214
[309]: https://github.com/facebookincubator/create-react-app/issues/309
[411]: https://github.com/facebookincubator/create-react-app/issues/411
[1357]: https://github.com/facebookincubator/create-react-app/issues/1357

[462]: https://github.com/facebookincubator/create-react-app/issues/462
[662]: https://github.com/facebookincubator/create-react-app/pull/662
[900]: https://github.com/facebookincubator/create-react-app/issues/900
