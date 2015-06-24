var fs = require('fs');
var path = require('path');
var wiredep = require('wiredep');
var BUILD_CONFIG = require('./build.config.js');

var files = [];

var bowerComponents = wiredep({
    devDependencies: true
});

if (bowerComponents) {
    files = files.concat(bowerComponents.js);
}
files = files.concat(BUILD_CONFIG.karma.files);
console.log("files:", files);
module.exports = function(config) {
    'use strict';

    config.set({
        autoWatch: true,
        basePath: './',
        frameworks: [
            'mocha',
            'chai',
            'sinon'

        ],
        files: files,
        client: {
            captureConsole: true,
            mocha: {
                ui: 'bdd'
            }
        },
        exclude: [],
        port: 8180,
        browsers: ['PhantomJS'],
        singleRun: false,
        continous: true,
        colors: true,
        logLevel: config.LOG_ERROR,
        reporters: ['progress', 'coverage'],
        junitReporter: {
            outputFile: 'build/reports/karma-report.xml'
        },
        plugins: [
            'karma-chai',
            'karma-mocha',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-safari-launcher',
            'karma-firefox-launcher',
            'karma-junit-reporter',
            'karma-sinon',
            'karma-coverage'
        ],
        preprocessors: {
            'src/!(coverage)/**/!(*.spec).js': ['coverage']
        },
        // configure the reporter
        coverageReporter: {
            dir: 'coverage',
            reporters: [
                {type: 'html', subdir: 'html'},
                {type: 'text', subdir: '.'},
                {type: 'lcovonly', subdir: '.'},
                {type: 'json', subdir: '.'},
                {type: 'cobertura', subdir: '.'}
            ]
        }
    });
};