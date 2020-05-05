/**
 * Paths
 *
 * Assets related paths.
 */
const path = require( 'path' );
const cwd = process.cwd();

module.exports = {
	classicEditor: path.resolve( cwd, 'src/js', 'spc-classic-editor.js' ),
	gutenberg: path.resolve( cwd, 'src/js', 'spc-gutenberg.js' ),
	output: path.resolve( cwd, 'dist' )
};
