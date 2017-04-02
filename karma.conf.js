let webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
    config.set({

        browsers: ['Firefox'],
        frameworks: ['jasmine'],

        autoWatch: false,
        files: ['webpack.tests.js'],
        preprocessors: {
            'webpack.tests.js': ['webpack', 'sourcemap'],
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
