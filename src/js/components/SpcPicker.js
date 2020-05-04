/**
 * SPC Picker
 */

import { Component, Fragment } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';

class SPCPicker extends Component {

	render() {
		const {
			primaryTaxonomy,
			selectedTermsIds
		} = this.props;

		return (
			<Fragment>
				<div style={{marginTop:'12px'}}>
					<p><strong>Primary {primaryTaxonomy.title}</strong></p>
					<select name={`spc-primary-term-${primaryTaxonomy.name}`} id={`spc_primary_term_${primaryTaxonomy.name}`}>
						<option value="-1">— Select Primary {primaryTaxonomy.title} —</option>
						{primaryTaxonomy.terms.map( term => {
							if ( selectedTermsIds.includes( term.id ) ) {
								return (
									<option value={term.id}>{term.name}</option>
								)
							}
						})}
					</select>
				</div>
			</Fragment>
		);
	}
}

export default compose( [
	withSelect( ( select, props ) => {
		const editor = select( 'core/editor' );
		const { primaryTaxonomy } = props;
		const editorSelectedTermsIds = editor.getEditedPostAttribute( primaryTaxonomy.restBase );
		return { selectedTermsIds: editorSelectedTermsIds }
	})
] )(SPCPicker);
