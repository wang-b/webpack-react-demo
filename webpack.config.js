/**
 * webpack config
 * @author wangbin
 * @since 2016/10/13 10:42
 * @version 0.9.0
 */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, '.');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

var env = process.env.NODE_ENV || 'development';

module.exports = {
    devtool: 'eval-source-map',   //配置生成Source Maps

    entry: {
        //"index": 即[name]对应的值，默认为main
        "index": path.resolve(APP_PATH, 'index.js')
    },  //唯一的入口文件
    output: {
        path: BUILD_PATH, //打包文件存放的地方
        filename: '[name].js?[hash]'   //打包文件输出文件名
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
            },
            {
                test: /\.css$/,
                //loader: 'style!css?modules!postcss'
                loader: ExtractTextWebpackPlugin.extract('style', 'css?modules!postcss')
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url?limit=8192'  //只有小于8K的文件才会打包成Base64
            }
        ]
    },

    postcss: function () {
        return [require('autoprefixer')];  //调用autoprefixer插件，对值自动添加前缀-webkit-等
    },

    plugins: [
        new webpack.BannerPlugin('Copyright Flying Gli inc.'),  //添加版权声名等文本信息
        new HtmlWebpackPlugin({
            template: path.resolve(APP_PATH, 'index.html')   //模板文件位置
        }),
        new webpack.HotModuleReplacementPlugin(),  //热加载插件
        new webpack.optimize.OccurrenceOrderPlugin(),  //为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
        new webpack.optimize.UglifyJsPlugin(),  //压缩JS代码
        new ExtractTextWebpackPlugin('[name].css?[hash]'),  //分离CSS和JS文件
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        })
    ],

    devServer: {
        contentBase: '.',  //本地服务器所加载页面所在目录
        port: '8080',  //端口
        colors: true, //终端输出为彩色
        inline: true, //实时刷新
        hot: true, //启用热加载
        historyApiFallback: true //如果设置为true，所有的跳转将指向index.html
    }
};
