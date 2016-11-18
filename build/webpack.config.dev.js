var path = require('path')
var projectRoot = path.resolve(__dirname, '../')

module.exports = {
    entry: './src/main.js',
    output: {
        path: './dev',
        publicPath: '/dev/',
        filename: 'bundle.js'
    }
};