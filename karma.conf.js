let path = require('path');
let webpackConfig = require('./webpack.config.js');
let cwd = __dirname ? __dirname : process.cwd();


webpackConfig.devtool = 'inline-source-map';

webpackConfig.module.loaders.concat([
    {
        include: path.join(cwd, 'client/source/js'),
        loader: 'babel-loader',
        query: {
            presets: ['react', 'airbnb', 'es2015', 'stage-0']
        },
        test: /\.(js|jsx)$/
    },
]);

webpackConfig.externals = {
    'cheerio': 'window',
    'react/addons': 'react',
    'react/lib/ExecutionEnvironment': 'react',
    'react/lib/ReactContext': 'react'
};

module.exports = function(config) {
    config.set({
        autoWatch: false,

        babelPreprocessor: {
            options: {
                presets: ['es2015', 'react'],
                sourceMap: 'inline'
            }
        },
        browserNoActivityTimeout: 100000,
        browsers: ['Firefox'],
        client: {
            captureConsole: true
        },
        files: ['webpack.tests.js'],
        frameworks: ['mocha', 'chai'],
        preprocessors: {
            'webpack.tests.js': ['webpack', 'sourcemap', 'babel']
        },
        reporters: ['dots'],
        singleRun: true,
        webpack: webpackConfig

    });
};
