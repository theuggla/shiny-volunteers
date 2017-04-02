let webpackConfig = require('./webpack.config.js');
process.env.CHROME_BIN = '/usr/bin/chrome';

module.exports = function(config) {
    config.set({

        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],

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

        webpackMiddleware: {
            noInfo: true
        },

        browserNoActivityTimeout: 100000, // 100 seconds

    });
};
