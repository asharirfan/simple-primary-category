/**
 * SPC Gutenberg Scripts
 */
import {Component} from '@wordpress/element';
import SPCInit from './components/SpcInit';

// Init Gutenberg SPC selector.
spcGutenbergInit();

/**
 * Check if Gutenberg is active.
 */
function isGutenbergActive() {
	return 'undefined' !== typeof wp && 'undefined' !== typeof wp.blocks;
}

/**
 * Init Gutenberg SPC selector.
 */
function spcGutenbergInit() {
	if ( ! isGutenbergActive() ) {
		return;
	}

	wp.hooks.addFilter(
		'editor.PostTaxonomyType',
		'simple-primary-category',
		TaxonomyComponent => {
			return class Filter extends Component {
				render() {
					return (
						<SPCInit
							TaxonomyComponent={ TaxonomyComponent }
							{ ...this.props }
						/>
					);
				}
			}
		}
	);
}
