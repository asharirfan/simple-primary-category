/**
 * SPC Init
 */
import {Component, Fragment} from '@wordpress/element';
import {values} from 'lodash-es';
import SPCPicker from './SpcPicker';

export default class SPCInit extends Component {
	constructor() {
		super();

		this.state = {
			taxonomies: spcData.taxonomies
		}
	}

	hasPrimaryTaxonomySupport() {
		return this.state.taxonomies.hasOwnProperty( this.props.slug );
	}

	render() {
		const {
			slug,
			TaxonomyComponent
		} = this.props;

		if ( ! this.hasPrimaryTaxonomySupport() ) {
			return (
				<TaxonomyComponent {...this.props} />
			);
		}

		return (
			<Fragment>
				<TaxonomyComponent {...this.props} />
				<SPCPicker primaryTaxonomy={ this.state.taxonomies[slug] } />
			</Fragment>
		);
	}
}
