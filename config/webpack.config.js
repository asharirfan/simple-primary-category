/**
 * Webpack Custom Config.
 */
const paths = require( './paths' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const { mode, resolve, plugins, stats } = defaultConfig;

// Set output filenames for development and production modes.
let outputFilename = '[name].js';
outputFilename = 'production' === mode ? '[name].min.js' : outputFilename;

module.exports = {
	mode,
	entry: {
		'spc-classic-editor': paths.classicEditor,
		'spc-gutenberg': paths.gutenberg
	},
	output: {
		filename: outputFilename,
		path: paths.output,
		pathinfo: true
	},
	resolve,
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules
		]
	},
	plugins,
	stats
};
