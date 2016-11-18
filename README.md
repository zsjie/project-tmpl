# project-tmpl

这是个人项目模板，使用 webpack 进行打包，babel 进行语法转换，eslint 进行代码风格提示。

## 配置说明

### 使用 webpack-dev-server 启动服务器

在 webpack 配置文件中：

```javascript
// build/webpack.config.dev.js
module.exports = {
    output: {
        path: './dev', // 打包输出文件的路径
        publicPath: '/dev/', // 运行时的访问路径，index.html 可以通过 /dev/bundle.js 这样的路径来加载资源
        filename: 'bundle.js' // 打包文件名
    }
}
```

可以通过以下命令来启动服务器，`--inline` 表示使用 inline 模式自动刷新，`--hot` 表示使用热更新，`--port` 指定端口，`--host` 指定 hostname 为 `0.0.0.0.0` 使其他终端，比如手机，也可以访问页面，方便调试，`--config` 指定配置文件。

```shell
webpack-dev-server --inline --hot --port=3004 --host 0.0.0.0 --config ./build/webpack.config.dev.js
```

## babel

在 babel 6 里，要转换 ES2015/ES7 的代码，需要自己配置插件，基本上每个特性 babel 都提供了对应的插件来进行转换。可以根据需要按照特性进行配置，也可以是使用另外一个办法： presets，相当于一个特性集合。所以我们需要这些依赖：

- babel-core
- babel-preset-es2015：
- babel-preset-stage-2

babel 虽然可以进行语法转换，但浏览器未提供原生支持的许多特性还是需要 polyfill。我们可以使用 babel-polyfill 或者 babel-runtime 来模拟 ES2015 环境。如果使用 babel-polyfill，在入口文件中引入即可，即全局都引入了所有新特性的 polyfill：

```javascript
import babel-polyfill
```

babel-runtime 更像是分散的 polyfill 模块，我们可以在自己的模块里单独引入，比如 `require(‘babel-runtime/core-js/promise’)` ，它们不会在全局环境添加未实现的方法，只是，这样手动引用每个 polyfill 会非常低效。我们借助 `babel-plugin-transform-runtime` 插件来自动化引入 polyfill。

```shell
npm install --save-dev babel-core babel-preset-es2015 babel-preset-stage-2 babel-plugin-transform-runtime
```

新建一个 babel 配置文件 `.babelrc`：

```json
{
  "presets": ["es2015", "stage-2"],
  "plugins": ["transform-runtime"]
}
```

在 webpack 中配置：

```javascript
module.exports = {
    // ...
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                include: projectRoot
            }
        ]
    }
};
```

## eslint

eslint 是一个插件化的 JavaScript 代码检测工具，它可以用于检查常见的 JavaScript 代码错误，也可以进行代码风格检查，帮助我们写出风格统一的代码，有效控制项目代码的质量。我们在这里采用 airbnb 开源的代码规范。

- eslint
- babel-eslint：使用 babel-eslint 解析器，默认的解析器为 esprima
- eslint-confog-airbnb-base：airbnb 代码规范
- eslint-loader：在 webpack 中配置 eslint-loader 以便在开发过程中实时检查语法
- eslint-plugin-import：支持 import/export 语法

```shell
npm install --save-dev eslint babel-eslint eslint-confog-airbnb-base eslint-loader eslint-plugin-import
```

eslint 配置文件 `.eslintrc.js`：

```javascript
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true, // browser 全局变量
    node: true, //  Node.js 全局变量和 Node.js 作用域
    es6: true // 支持除模块外所有 ECMAScript 6 特性
  },
  extends: 'airbnb-base',
  'rules': {
    // 开发环境下允许调试语句
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
```

在 webpack 中配置：

```javascript
module.exports = {
    // ...
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                include: projectRoot,
                exclude: /node_modules/
            }
        ],
        loaders: [
            // ...
        ]
    }
};
```


