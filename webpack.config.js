/**
 * webpack config
 * @author wangbin
 * @since 2016/10/13 10:42
 * @version 0.9.0
 */
var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval-source-map',   //配置生成Source Maps

    entry: path.join(__dirname, 'index.js'),  //唯一的入口文件
    output: {
        path: path.join(__dirname, 'build'), //打包文件存放的地方
        filename: 'bundle.js'   //打包文件输出文件名
    },

    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel' //提供ES6和JSX支持
            }
        ]
    },

    devServer: {
        contentBase: './build',  //本地服务器所加载页面所在目录
        port: '8080',  //端口
        colors: true, //终端输出为彩色
        inline: true, //实时刷新
        historyApiFallback: true //如果设置为true，所有的跳转将指向index.html
    }
};
