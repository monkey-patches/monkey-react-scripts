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

## Example 
### Webpack Visualizer
I love visualization so I wan't add [webpack-visualizer-plugin][webpack-visualizer] to my project
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

## TODOs
- [ ] add helpers
- [ ] customize test runner (jest)
- [ ] add more example
  - [ ] scss support
  - [ ] decorator support
  - [ ] relay support

## Thanks
@svrcekmichal for [configurable-react-scripts][configurable-react-scripts]

[create-react-app]: https://github.com/facebookincubator/create-react-app#tldr
[webpack-visualizer]: https://github.com/chrisbateman/webpack-visualizer
[configurable-react-scripts]: https://github.com/svrcekmichal/configurable-react-scripts