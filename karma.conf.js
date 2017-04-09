let webpack = require('webpack');
let path = require('path');
let webpackConfig = require('./webpack.config.js');
let cwd = __dirname ? __dirname : process.cwd();


webpackConfig.devtool = 'inline-source-map';

webpackConfig.module.loaders.concat([
    {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: path.join(cwd, 'client/source/js'),
        query: {
            presets: ['react', 'airbnb', 'es2015', 'stage-0']
        }
    },
]);

webpackConfig.externals = {
    'cheerio': 'window',
    'react' : 'react',
    'react/addons': 'react',
    'react/lib/ExecutionEnvironment': 'react',
    'react/lib/ReactContext': 'react'
};

module.exports = function(config) {
    config.set({

        browsers: ['Firefox'],
        frameworks: ['mocha', 'chai'],

        autoWatch: false,
        files: ['webpack.tests.js'],
        preprocessors: {
            'webpack.tests.js': ['webpack', 'sourcemap', 'babel'],
        },
        babelPreprocessor: {
            options: {
                presets: ['es2015', 'react'],
                sourceMap: 'inline'
            }
        },

        webpack: webpackConfig,
        client: {
            captureConsole: true
        },

        reporters: ['dots'],
        singleRun: true,


        browserNoActivityTimeout: 100000, // 100 seconds

    });
};
