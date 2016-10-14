/**
 * 服务器启动文件
 * @author wangbin
 * @since 2016/10/14 14:35
 * @version 0.9.0
 */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');

var host = '127.0.0.1';
var port = 80;

//添加热启动相关支持
config.entry.unshift('webpack-dev-server/client?http://' + host + ':' + port);
config.entry.unshift('webpack/hot/only-dev-server');

//启动服务器监控
new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true, //启用热加载
    stats: { colors: true },
    historyApiFallback: true
}).listen(port, host, function(err, result) {
    if (err) {
        throw err;
    }
    console.log('Listening at ' + host + ':' + port);
});

