/**
 * SPC Picker
 */
import { Component, Fragment } from '@wordpress/element';
import { withSelect, withDispatch } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { compose } from '@wordpress/compose';
import { __, sprintf } from '@wordpress/i18n';

class SPCPicker extends Component {
	constructor() {
		super();

		this.state = {
			terms: null,
			primaryTermId: 0,
		};
	}

	/**
	 * Fetch terms on component mount.
	 */
	componentDidMount() {
		// Taxonomy terms fetch request.
		const termsRequest = apiFetch({
			path: addQueryArgs(
				`/wp/v2/${this.props.primaryTaxonomy.restBase}`,
				{
					_fields: 'id,name',
					orderby: 'count',
					order: 'desc',
					per_page: -1,
				}
			),
		});

		// Set terms state on fetch request completion.
		termsRequest.then((termsResponse) => {
			this.setState({ terms: termsResponse });
		});

		// Set the primary term id.
		this.setState({ primaryTermId: this.props.primaryTaxonomy.primary });
	}

	/**
	 * SPC selector onChange event handler.
	 *
	 * @param {Object} event Event object.
	 */
	onSelectChange(event) {
		const taxonomy = this.props.primaryTaxonomy.name;
		const metaObj = {};
		metaObj[`spc_primary_${taxonomy}`] = parseInt(event.target.value, 10);
		this.props.updateSPC(metaObj);
		this.setState({ primaryTermId: event.target.value });
	}

	/**
	 * Renders the SPCPicker component.
	 *
	 * @return {Element} Element to render.
	 */
	render() {
		const { primaryTaxonomy, selectedTermsIds } = this.props;
		const { title } = primaryTaxonomy;

		return (
			<Fragment>
				<h4>
					{sprintf(
						/* translators: %s expands to taxonomy title. */
						__('Primary %s', 'simple-primary-category'),
						title
					)}
				</h4>
				<select onChange={this.onSelectChange.bind(this)}>
					<option value="-1">
						{sprintf(
							/* translators: %s expands to taxonomy title. */
							__(
								'— Select Primary %s —',
								'simple-primary-category'
							),
							title
						)}
					</option>
					{this.state.terms &&
						this.state.terms.map((term) => {
							if (selectedTermsIds.includes(term.id)) {
								if (this.state.primaryTermId === term.id) {
									return (
										<option value={term.id} selected>
											{term.name}
										</option>
									);
								}
								return (
									<option value={term.id}>{term.name}</option>
								);
							}
						})}
				</select>
			</Fragment>
		);
	}
}

export default compose([
	withSelect((select, { primaryTaxonomy }) => {
		const { getEditedPostAttribute } = select('core/editor');

		return {
			selectedTermsIds: getEditedPostAttribute(primaryTaxonomy.restBase),
			meta: getEditedPostAttribute('meta'),
		};
	}),
	withDispatch((dispatch) => {
		const { editPost } = dispatch('core/editor');

		return {
			updateSPC(newMeta) {
				editPost({ meta: newMeta });
			},
		};
	}),
])(SPCPicker);
