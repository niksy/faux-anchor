'use strict';

const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const globals = require('rollup-plugin-node-globals');

module.exports = {
	input: 'index.js',
	output: [
		{
			file: 'index.cjs.js',
			format: 'cjs'
		},
		{
			file: 'index.esm.js',
			format: 'esm'
		}
	],
	plugins: [
		babel({
			exclude: 'node_modules/**'
		}),
		resolve(),
		commonjs(),
		globals()
	]
};
