/**
 * SPC Picker
 */
import { Fragment, useState } from '@wordpress/element';
import { withSelect, withDispatch } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { compose } from '@wordpress/compose';
import { __, sprintf } from "@wordpress/i18n";

const SPCPicker = props => {
	const {
		primaryTaxonomy,
		selectedTermsIds
	} = props;
	const { primary, title, restBase } = primaryTaxonomy;
	const taxonomy = primaryTaxonomy.name;

	// Declare component state.
	const [ terms, setTerms ] = useState( null );

	// Taxonomy terms fetch request.
	const termsRequest = apiFetch( {
		path: addQueryArgs(
			`/wp/v2/${ restBase }`,
			{
				_fields: 'id,name',
				orderby: 'count',
				order: 'desc',
				'per_page': -1
			}
		)
	} );

	// Set terms state on fetch request completion.
	termsRequest.then( termsResponse => {
		setTerms( termsResponse );
	} );

	/**
	 * SPC selector onChange event handler.
	 *
	 * @param {object} event Event object.
	 */
	const onSelectChange = (event) => {
		const metaObj = {};
		metaObj[`spc_primary_${taxonomy}`] = parseInt( event.target.value, 10 );
		props.updateSPC( metaObj );
	}

	return (
		<Fragment>
			<h4>
				{ sprintf(
					/* translators: %s expands to taxonomy title. */
					__( 'Primary %s', 'simple-primary-category' ),
					title
				) }
			</h4>
			<select onChange={onSelectChange}>
				<option value="-1">
					{ sprintf(
						/* translators: %s expands to taxonomy title. */
						__( '— Select Primary %s —', 'simple-primary-category' ),
						title
					) }
				</option>
				{ terms && terms.map( term => {
					if ( selectedTermsIds.includes( term.id ) ) {
						if ( primary === term.id ) {
							return (
								<option value={term.id} selected>{term.name}</option>
							)
						}
						return (
							<option value={term.id}>{term.name}</option>
						)
					}
				})}
			</select>
		</Fragment>
	);
}

export default compose( [
	withSelect( ( select, { primaryTaxonomy } ) => {
		const { getEditedPostAttribute } = select( 'core/editor' );

		return {
			selectedTermsIds: getEditedPostAttribute( primaryTaxonomy.restBase ),
			meta: getEditedPostAttribute( 'meta' )
		}
	}),
	withDispatch( dispatch => {
		const { editPost } = dispatch( 'core/editor' );

		return {
			updateSPC( newMeta ) {
				editPost( { meta: newMeta } );
			}
		}
	})
] )(SPCPicker);
