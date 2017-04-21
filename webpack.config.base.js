let path = require('path');
let HTMLWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');

let cwd = __dirname ? __dirname : process.cwd();

let DEV = path.join(cwd, 'client/source/');
let DEBUG = path.join(cwd, 'client/debug/');

let config = {
    devtool: 'source-map',
    entry: {
        main: DEV + 'js/app.jsx',
        sw: DEV + 'js/service-worker.js'
    },
    output: {
        path: DEBUG,
        filename: '[name].min.js'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                include: DEV + 'js',
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                include: DEV + 'css',
                loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.(jpg|jpeg|png|gif|)$/,
                loader: 'url-loader?limit=100000?name=[name].[ext]&publicPath=../assets/&outputPath=assets/'
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin("stylesheets/styles.css"),
        new HTMLWebpackPlugin({
            template: DEV + 'index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new CopyWebpackPlugin([
            {
                from: DEV + 'assets',
                to: 'assets'
            }
        ])
    ]
};

// Export.
module.exports = config;
