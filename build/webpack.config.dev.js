var path = require('path')
var projectRoot = path.resolve(__dirname, '../')

module.exports = {
    entry: './src/main.js',
    output: {
        path: './dev',
        publicPath: '/dev/',
        filename: 'bundle.js'
    },
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
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                include: projectRoot
            }
        ]
    }
};