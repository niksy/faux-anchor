'use strict';

const path = require('path');

let config;

const local = typeof process.env.CI === 'undefined' || process.env.CI === 'false';
const port = 9001;

if ( local ) {
	config = {
		browsers: ['Chrome'],
	};
} else {
	config = {
		browserStack: {
			startTunnel: true,
			project: 'faux-anchor',
			name: 'Automated (Karma)',
			build: 'Automated (Karma)'
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
			/* 'BS-iOS 10.3': {
				base: 'BrowserStack',
				device: 'iPhone 7',
				browser: 'Mobile Safari',
				'browser_version': null,
				'real_mobile': true,
				os: 'ios',
				'os_version': '10.3',
				project: 'faux-anchor',
				build: 'Automated (Karma)',
				name: 'iOS'
			}, */
			'BS-Android 4.4': {
				base: 'BrowserStack',
				device: 'Google Nexus 5',
				browser: 'Android Browser',
				'browser_version': null,
				'real_mobile': true,
				os: 'android',
				'os_version': '4.4',
				project: 'faux-anchor',
				build: 'Automated (Karma)',
				name: 'Android'
			}
		},
		browsers: ['BS-Chrome', 'BS-Firefox', 'BS-IE9', /* 'BS-iOS 10.3', */ 'BS-Android 4.4']
	};
}

module.exports = function ( baseConfig ) {

	baseConfig.set(Object.assign({
		basePath: '',
		frameworks: ['mocha', 'fixture'],
		files: [
			'test/automated/**/*.html',
			'test/automated/**/.webpack.js'
		],
		exclude: [],
		preprocessors: {
			'test/automated/**/*.html': ['html2js'],
			'test/automated/**/.webpack.js': ['webpack', 'sourcemap']
		},
		reporters: ['mocha', 'coverage-istanbul'],
		port: port,
		colors: true,
		logLevel: baseConfig.LOG_INFO,
		autoWatch: false,
		client: {
			captureConsole: true
		},
		browserConsoleLogOptions: {
			level: 'log',
			format: '%b %T: %m',
			terminal: true
		},
		browserNoActivityTimeout: 25000,
		webpack: {
			mode: 'none',
			devtool: 'cheap-module-inline-source-map',
			module: {
				rules: [
					{
						test: /\.js$/,
						exclude: /node_modules/,
						use: [{
							loader: 'babel-loader'
						}]
					},
					{
						test: /\.js$/,
						exclude: /(node_modules|test)/,
						enforce: 'post',
						use: [{
							loader: 'istanbul-instrumenter-loader',
							options: {
								esModules: true
							}
						}]
					}
				]
			}
		},
		coverageIstanbulReporter: {
			dir: path.join(__dirname, 'coverage/%browser%'),
			fixWebpackSourcePaths: true,
			reports: ['html', 'text'],
			thresholds: {
				global: {
					statements: 80
				}
			}
		},
		singleRun: true,
		concurrency: Infinity
	}, config));

};
