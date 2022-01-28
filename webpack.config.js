/**
 * Webpack Custom Config.
 */
const path = require('path');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

defaultConfig.entry = {
	'spc-classic-editor': path.resolve(
		process.cwd(),
		'src/js',
		'spc-classic-editor.js'
	),
	'spc-gutenberg': path.resolve(process.cwd(), 'src/js', 'spc-gutenberg.js'),
};

defaultConfig.output = {
	filename: '[name].js',
	path: path.resolve(process.cwd(), 'dist'),
};

module.exports = {
	...defaultConfig,
};
