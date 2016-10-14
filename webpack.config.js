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

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, '.');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');
const NODE_MODULES = path.resolve(ROOT_PATH, 'node_modules');

const PORT = 80;
const PUBLIC_PATH = '/';

var env = process.env.NODE_ENV || 'development';

module.exports = {
    devtool: 'eval-source-map',   //配置生成Source Maps

    //入口文件，对象形式-多个入口文件递归查找；数组形式-顺序打包
    //多个入口文件，{index: path.resolve(APP_PATH, 'src/index.js')},//index: 即[name]对应的值，默认为main
    //['webpack/hot/dev-server', './src/index.js'], //相对路径中./不能少
    entry: [
        './src/index.js'
    ],
    output: {
        path: BUILD_PATH, //打包文件存放绝对路径
        publicPath: PUBLIC_PATH, //网站动行时访问路径
        filename: 'js/[name].js'   //打包文件输出文件名及路径
    },

    // resolve：定义了解析模块路径时的配置，常用的就是extensions，可以用来指定模块的后缀，
    // 这样在引入模块时就不需要写后缀了，会自动补全
    resolve: {
        extensions: ['', '.js', '.css', '.json', '.less']
    },

    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.js$/,
                exclude: NODE_MODULES,   //正则形式：/node_modules/
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
        ],
        noParse: []   //阻止webpack解析指定内容
    },

    postcss: function () {
        return [require('autoprefixer')];  //调用autoprefixer插件，对值自动添加前缀-webkit-等
    },

    plugins: [
        new webpack.BannerPlugin('Copyright Flying Gli inc.'),  //添加版权声名等文本信息
        new HtmlWebpackPlugin({
            favicon: path.resolve(APP_PATH, 'public/favicon.ico'),  //网站图标
            template: path.resolve(APP_PATH, 'index.html'),   //模板文件位置
            filename: 'index.html',  //生成文件存放路径及文件名，相对于output.path
            inject: true,    //允许插件修改哪些内容，包括head与body，或者true
            hash: true,    //为静态资源生成hash值, 生成示例: /css/index.css?d8f9375f226d3c0b28b1
            minify:{      //压缩HTML文件
                removeComments:true,    //移除HTML中的注释
                collapseWhitespace:false    //删除空白符与换行符
            }
        }),
        new webpack.HotModuleReplacementPlugin(),  //热加载插件
        new webpack.optimize.OccurrenceOrderPlugin(),  //为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
        new webpack.optimize.UglifyJsPlugin(),  //压缩JS代码
        new ExtractTextWebpackPlugin('css/[name].css'),  //分离CSS和JS文件
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)   //格式：'"development"'
        })
    ],

    devServer: {
        publicPath: PUBLIC_PATH,
        contentBase: APP_PATH,  //本地服务器所加载页面所在目录
        hot: true, //启用热加载
        historyApiFallback: true, //如果设置为true，所有的跳转将指向index.html

        // Make connection between webpack-dev-server and its runtime set inline: true
        inline: true,
        lazy: false,
        quiet: false,
        noInfo: false,
        headers: {"Access-Control-Allow-Origin": "*"},
        stats: {colors: true},

        // webpack-dev-server will serve built/bundled static files from host:port
        host: '0.0.0.0',
        port: PORT
    }
};
