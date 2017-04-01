let webpack = require('webpack');
let path = require('path');
let HTMLWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let CopyWebpackPlugin = require('copy-webpack-plugin');

let cwd = __dirname ? __dirname : process.cwd();

let DEV = path.join(cwd, 'client/source/');
let DEBUG = path.join(cwd, 'client/debug/');

let config = {
    entry: [DEV + 'js/app.jsx'],
    output: {
        path: DEBUG,
        filename: 'javascript/[name].min.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                include: DEV + 'js',
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                include: DEV + 'css',
                loader: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader"})
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'url-loader?limit=100000'
            }
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
        ]),
    ]
};

//Export.
module.exports = config;
