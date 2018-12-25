# monkey-react-scripts

Monkey react script runner: Customize react-scripts webpack config without eject or fork

Many of you want to add a small change to your webpack config created by create-react-app. but you don't want to eject. or
use other scripts like [configurable-react-scripts][configurable-react-scripts] or
[custom-react-scripts][custom-react-scripts] because of update delay.

With monkey-react-scripts you can use react-scripts configs, but monkey patched one. so you always have updated
react-scripts.

## ☢ DANGER ☢

> As [@gaearon](https://github.com/gaearon) mentioned multiple times there, it's not good idea to extend it. From my
> point of view, I'm giving you gun, so try not to shot yourself, because probably nobody will help you. When you modify
> something, be completely sure what you doing!

[source][configurable-react-scripts]

## Usage

- use create-react-app and create your project, [more detail][create-react-app]

```
npm install -g create-react-app

create-react-app my-app
cd my-app/
```

- install monkey-react-scripts

```
npm install monkey-react-scripts --save-dev --save-exact
```

- create `webpack.monkey.js` in the root of your project. you can modify webpack config here.

```js
module.exports = function(webpackConfig, isDevelopment) {
  // mutate webpackConfig
};
```

- edit `package.json` and replace scripts

```
  "scripts": {
    "start": "monkey-react-scripts start",
    "build": "monkey-react-scripts build",
    "test": "monkey-react-scripts test"
  }
```

## How it works

I suggest you see [scripts](scripts) and [bin](bin) folders. (less than 100 line of code)

Note: returned value of `require` function is mutable. so you can mutate that before real build/start script.

## Snippets

You can use [snippets](snippets/cra-2.x.x.md) if you want.

snippets:

- `addPlugin`
- `findRule`
- `addBabelPlugins`

## Example

Before use examples, you should know what happens inside react-scripts webpack config.
first, see and read this files:

- `node_modules/react-scripts/config/webpack.config.dev.js`
- `node_modules/react-scripts/config/webpack.config.prod.js`

also, you can log `webpackConfig` value.

```js
// webpack.monkey.js
module.exports = function(webpackConfig, isDevelopment) {
  console.log(webpackConfig);
};
```

Also, you can find complete examples at [monkey-react-scripts-example] repo

### Webpack Visualizer

I love visualization so, I add [webpack-visualizer-plugin][webpack-visualizer] to my project

- install plugin:

```
npm install webpack-visualizer-plugin --save-dev
```

- add the plugin to config (only at build time)

```js
// webpack.monkey.js
var Visualizer = require("webpack-visualizer-plugin");

module.exports = function(webpackConfig, isDevelopment) {
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
│   ├── js
│   └── media
└── stats.html                      <-- new file
```

### Decorator support

If you love decorators, you can add decorator support:

- install decorator plugin

```
npm install --save-dev @babel/plugin-proposal-decorators
```

- edit `webpack.monkey.js` like this (copy `findRule`, `addBabelPlugins` from [snippets](snippets/cra-2.x.x.md)):

```js
function findRule(webpackConfig, callback) {
  /* snippet codes */
}

function addBabelPlugins(webpackConfig, plugins) {
  /* snippet codes */
}

module.exports = function(webpackConfig, isDevelopment) {
  addBabelPlugins(webpackConfig, [
    ["@babel/plugin-proposal-decorators", { legacy: true }]
  ]);
};
```

related issues: [#107][107], [#167][167], [#214][214], [#309][309], [#411][411], [#1357][1357]

### Relay support

- install `babel-plugin-relay`

```
yarn add --dev babel-plugin-relay
```

- edit `webpack.monkey.js`

```js
module.exports = function(webpackConfig, isDevelopment) {
  addBabelPlugins(webpackConfig, ["relay"]);
};
```

and continue [relay documentation][relay-setup] steps.

if you are using relay classic you can see [old readme][old-relay-support] and get some ideas.

related issues: [#462][462], [#662][662], [#900][900]

## postcss config

If you want to change postcss config you can use this code.

```js
// add rtl css support
// find postCssLoader
const postCssFunction = postCssLoader.options.plugins;
postCssLoader.options.plugins = () => {
  return [...postCssFunction(), require("postcss-inline-rtl")];
};
```

you can find more detail in [this file][css-patch]

## TODOs

- [ ] customize test runner (jest)
- [x] add more example
  - [x] relay support

## compatibility

| react-scripts | monkey-react-scripts |
| :-----------: | :------------------: |
|     0.9.x     |        0.0.5         |
|     1.x.x     |        0.1.0         |
| 2.0.0 - 2.1.1 |        0.1.2         |
|     2.1.2     |        0.1.4         |

## Thanks

@svrcekmichal for [configurable-react-scripts][configurable-react-scripts]

[create-react-app]: https://github.com/facebookincubator/create-react-app#tldr
[webpack-visualizer]: https://github.com/chrisbateman/webpack-visualizer
[configurable-react-scripts]: https://github.com/svrcekmichal/configurable-react-scripts
[custom-react-scripts]: https://github.com/kitze/custom-react-scripts
[relay-setup]: https://facebook.github.io/relay/docs/en/installation-and-setup.html
[monkey-react-scripts-example]: https://github.com/monkey-patches/monkey-react-scripts-example
[old-relay-support]: https://github.com/monkey-patches/monkey-react-scripts/blob/b7380bbb873d637cdd6cf911de9f696b90b608fe/README.md#relay-support
[css-patch]: https://github.com/monkey-patches/monkey-react-scripts-example/blob/d759030325ca2d638b1ea0dd44e51655b88d5022/webpack-helpers/cssPatch.js
[107]: https://github.com/facebookincubator/create-react-app/issues/107
[167]: https://github.com/facebookincubator/create-react-app/issues/167
[214]: https://github.com/facebookincubator/create-react-app/issues/214
[309]: https://github.com/facebookincubator/create-react-app/issues/309
[411]: https://github.com/facebookincubator/create-react-app/issues/411
[1357]: https://github.com/facebookincubator/create-react-app/issues/1357
[462]: https://github.com/facebookincubator/create-react-app/issues/462
[662]: https://github.com/facebookincubator/create-react-app/pull/662
[900]: https://github.com/facebookincubator/create-react-app/issues/900
