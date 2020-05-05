/**
 * SPC Init
 */
import { Component, Fragment } from '@wordpress/element';
import SPCPicker from './SpcPicker';

/**
 * SPC Init Component
 */
class SPCInit extends Component {
	constructor() {
		super();

		this.state = {
			hasError: false,
			error: null,
		}
	}

	/**
	 * Handle the component errors.
	 *
	 * @param {object} error Error object.
	 */
	static getDerivedStateFromError( error ) {
		return {
			hasError: true,
			error
		};
	}

	/**
	 * Renders the SPCInit component.
	 *
	 * @returns {ReactElement}
	 */
	render() {
		const { slug, TaxonomyComponent } = this.props;
		const taxonomies = spcData.taxonomies;

		if ( this.state.hasError ) {
			return (
				<TaxonomyComponent {...this.props} />
			);
		}

		if ( ! taxonomies.hasOwnProperty( slug ) ) {
			return (
				<TaxonomyComponent {...this.props} />
			);
		}

		return (
			<Fragment>
				<TaxonomyComponent {...this.props} />
				<SPCPicker primaryTaxonomy={ taxonomies[slug] } />
			</Fragment>
		);
	}
}

export default SPCInit;
