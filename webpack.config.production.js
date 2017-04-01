'use strict';

let webpack = require('webpack');
let path = require('path');
let config = require('./webpack.config.base.js');
let cwd = __dirname ? __dirname : process.cwd();

let DIST = path.join(cwd, '/client/dist/');


config.bail = true;
config.debug = false;
config.profile = false;
config.devtool = '#source-map';

config.output = {
    path: DIST,
    filename: 'javascript/[hash].min.js'
};

config.plugins = config.plugins.concat([
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
        output: {
            comments: false
        },
        compress: {
            warnings: false,
            screw_ie8: true
        }
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    })
]);

//Exports.
module.exports = config;
