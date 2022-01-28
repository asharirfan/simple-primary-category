/**
 * SPC Gutenberg Scripts
 */
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
 * Add SPC component to Gutenberg post taxonomies component.
 *
 * @param {Element} PostTaxonomiesComponent Post taxonomies component of Gutenberg.
 */
function addSpcComponent(PostTaxonomiesComponent) {
	return (props) => {
		return (
			<SPCInit TaxonomyComponent={PostTaxonomiesComponent} {...props} />
		);
	};
}

/**
 * Init Gutenberg SPC selector.
 */
function spcGutenbergInit() {
	if (!isGutenbergActive()) {
		return;
	}

	wp.hooks.addFilter(
		'editor.PostTaxonomyType',
		'simple-primary-category',
		addSpcComponent
	);
}
