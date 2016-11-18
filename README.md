# project-tmpl

这是个人项目模板，使用 webpack 进行打包，babel 进行语法转换，eslint 进行代码风格提示。

## 配置说明

使用 webpack-dev-server 启动服务器，配置：

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
