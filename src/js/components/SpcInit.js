/**
 * SPC Init
 */
import { Component, Fragment } from '@wordpress/element';
import SPCPicker from './SpcPicker';

/* global spcData */

/**
 * SPC Init Component
 */
class SPCInit extends Component {
	constructor() {
		super();

		this.state = {
			hasError: false,
			error: null,
		};
	}

	/**
	 * Handle the component errors.
	 *
	 * @param {Object} error Error object.
	 */
	static getDerivedStateFromError(error) {
		return {
			hasError: true,
			error,
		};
	}

	/**
	 * Renders the SPCInit component.
	 *
	 * @return {Element} Element to render.
	 */
	render() {
		const { slug, TaxonomyComponent } = this.props;
		const taxonomies = spcData.taxonomies;

		if (this.state.hasError) {
			return <TaxonomyComponent {...this.props} />;
		}

		if (!taxonomies.hasOwnProperty(slug)) {
			return <TaxonomyComponent {...this.props} />;
		}

		return (
			<Fragment>
				<TaxonomyComponent {...this.props} />
				<SPCPicker primaryTaxonomy={taxonomies[slug]} />
			</Fragment>
		);
	}
}

export default SPCInit;
