/* globals process:false */
/* eslint-disable no-process-env */

'use strict';

module.exports = function ( config ) {

	config.set({
		basePath: '',
		frameworks: ['browserify', 'mocha'],
		files: [
			'test/automated/**/*.html',
			'test/automated/**/*.js'
		],
		exclude: [],
		preprocessors: {
			'test/automated/**/*.html': ['html2js'],
			'test/automated/**/*.js': ['browserify']
		},
		reporters: ['mocha', 'coverage'],
		port: 9001,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		browserStack: {
			startTunnel: true,
			project: 'faux-anchor',
			name: 'Automated (Karma)',
			build: 'Automated (Karma)'
		},
		client: {
			captureConsole: true,
			mocha: {
				ui: 'bdd'
			}
		},
		browserConsoleLogOptions: {
			level: 'log',
			format: '%b %T: %m',
			terminal: true
		},
		browserify: {
			debug: true,
			transform: [
				'babelify',
				['browserify-babel-istanbul', { defaultIgnore: true }]
			]
		},
		coverageReporter: {
			reporters: [
				{
					type: 'html'
				},
				{
					type: 'text'
				}
			],
			check: {
				global: {
					statements: 80
				}
			}
		},
		customLaunchers: {
			'BS-Chrome': {
				base: 'BrowserStack',
				browser: 'Chrome',
				os: 'Windows',
				'os_version': '7',
				project: 'faux-anchor',
				build: 'Automated (Karma)',
				name: 'Chrome'
			},
			'BS-Firefox': {
				base: 'BrowserStack',
				browser: 'Firefox',
				os: 'Windows',
				'os_version': '7',
				project: 'faux-anchor',
				build: 'Automated (Karma)',
				name: 'Firefox'
			},
			'BS-IE9': {
				base: 'BrowserStack',
				browser: 'IE',
				'browser_version': '9',
				os: 'Windows',
				'os_version': '7',
				project: 'faux-anchor',
				build: 'Automated (Karma)',
				name: 'IE9'
			},
			'BS-iOS 8.3': {
				base: 'BrowserStack',
				device: 'iPhone 6',
				browser: 'Mobile Safari',
				'browser_version': null,
				os: 'ios',
				'os_version': '8.3',
				project: 'faux-anchor',
				build: 'Automated (Karma)',
				name: 'iOS'
			},
			'BS-Android 4.2': {
				base: 'BrowserStack',
				device: 'Google Nexus 4',
				browser: 'Android Browser',
				'browser_version': null,
				os: 'android',
				'os_version': '4.2',
				project: 'faux-anchor',
				build: 'Automated (Karma)',
				name: 'Android'
			}
		},
		browsers: ['BS-Chrome', 'BS-Firefox', 'BS-IE9', 'BS-iOS 8.3', 'BS-Android 4.2'],
		singleRun: true,
		concurrency: Infinity,
		browserNoActivityTimeout: 25000
	});

};
