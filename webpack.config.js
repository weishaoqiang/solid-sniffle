var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('[name].[hash].css');
const extractLESS = new ExtractTextPlugin('[name].[hash].css');
var config = {
    entry: {
        index: './src/page-index/index.js',
        sub: './src/page-index/sub.js',
        serv: './src/page-serv/serv.js',
        homegoods: './src/page-serv/homegoods.js',
        offical: './src/page-serv/offical.js',
        ec: './src/page-serv/ec.js',
        advan: './src/page-advan/advan.js',
        news: './src/page-news/news.js',
        newsdetail:'./src/page-news/newsdetail.js',
        contact: './src/page-contact/contact.js',
        compro: './src/page-compro/compro.js',
        browsertip: './src/page-browsertip/tip.js',
        app: ['jquery']
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: '[name].[hash].js',
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: extractCSS.extract({
                fallback:'style-loader',
                use:['css-loader','postcss-loader']
            })
        },{
            test: /\.less$/,
            use: extractLESS.extract({
                fallback: 'style-loader',
                use: ['css-loader','postcss-loader','less-loader'],
            }),
        },{
            test: /\.(png|jpg|svg|gif|eot|woff|ttf|jpeg)$/,
            use: ['url-loader?limit=8000'],
        },
    ]
    },
    plugins: [
        extractCSS,
        extractLESS,
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'html-withimg-loader!' + './src/page-index/index.html',
            chunks: ['app', 'index'],
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'sub.html',
            template: 'html-withimg-loader!' + './src/page-index/sub.html',
            chunks: ['app', 'sub'],
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'serv.html',
            template: 'html-withimg-loader!' + './src/page-serv/serv.html',
            chunks: ['app', 'serv'],
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'homegoods.html',
            template: 'html-withimg-loader!' + './src/page-serv/homegoods.html',
            chunks: ['app', 'homegoods'],
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'offical.html',
            template: 'html-withimg-loader!' + './src/page-serv/offical.html',
            chunks: ['app', 'offical'],
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'ec.html',
            template: 'html-withimg-loader!' + './src/page-serv/ec.html',
            chunks: ['app', 'ec'],
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'waw.html',
            template: 'html-withimg-loader!' + './src/page-advan/waw.html',
            chunks: ['app', 'advan'],
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'news.html',
            template: 'html-withimg-loader!' + './src/page-news/news.html',
            chunks: ['app', 'news'],
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'newsdetail.html',
            template: 'html-withimg-loader!' + './src/page-news/newsdetail.html',
            chunks: ['app', 'newsdetail'],
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'about.html',
            template: 'html-withimg-loader!' + './src/page-contact/about.html',
            chunks: ['app', 'contact'],
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'compro.html',
            template: 'html-withimg-loader!' + './src/page-compro/compro.html',
            chunks: ['app', 'compro'],
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'tip.html',
            template: 'html-withimg-loader!' + './src/page-browsertip/tip.html',
            chunks: ['app', 'browsertip'],
            inject: 'body'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'app',
            filename: '[name].[hash].js',
            //开发模式时不提取公共模块
            // minChunks: isProduction() ? 10 : false
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new webpack.LoaderOptionsPlugin({
            // debug: false,
            // drop_debugger: true,
            // drop_console: true
        })
    ],
    devServer : {
        historyApiFallback: true,
        hot: true,
        inline: true,
        // progress: true,
        disableHostCheck:true
    },
    // module.exports.devtool='source-map',
    resolve: {},
}
module.exports = config;
if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = ''
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            }
        })
    ])
}else {
    // module.exports.devServer= {
    //     historyApiFallback: true,
    //     hot: true,
    //     inline: true,
    //     // progress: true,
    //     disableHostCheck:true
    // },
    module.exports.devtool='source-map';
}
