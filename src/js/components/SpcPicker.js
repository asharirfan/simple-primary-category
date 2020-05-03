/**
 * SPC Picker
 */

import {Component, Fragment} from '@wordpress/element';

export default class SPCPicker extends Component {
	render() {
		const {
			primaryTaxonomy
		} = this.props;

		console.log( primaryTaxonomy );
		return (
			<Fragment>
				<div style={{marginTop:'12px'}}>
					<p><strong>Primary {primaryTaxonomy.title}</strong></p>
					<select name={`spc-primary-term-${primaryTaxonomy.name}`} id={`spc_primary_term_${primaryTaxonomy.name}`}>
						<option value="-1">— Select Primary {primaryTaxonomy.title} —</option>
						{primaryTaxonomy.terms.map( term => {
							if ( primaryTaxonomy.primary === term.id ) {
								return (
									<option value={term.id} selected>{term.name}</option>
								)
							}
							return (
								<option value={term.id}>{term.name}</option>
							)
						})}
					</select>
				</div>
			</Fragment>
		);
	}
}
