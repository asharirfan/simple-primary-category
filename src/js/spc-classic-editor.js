/**
 * SPC Taxonomy Selection Script.
 */

import { values } from 'lodash';

/* global spcData, jQuery */

jQuery(document).ready(function () {
	const taxonomies = spcData.taxonomies;
	const spcPrimaryTermInput = wp.template('spc-select-primary-term');

	/**
	 * Go through each post taxonomy and add relevant
	 * primary taxonomy selector and handlers to each box.
	 */
	jQuery(values(taxonomies)).each(function (index, taxonomy) {
		const taxonomyMetabox = jQuery(`#taxonomy-${taxonomy.name}`);

		const primaryTermInputHtml = spcPrimaryTermInput({
			taxonomy,
		});

		taxonomyMetabox.append(primaryTermInputHtml);

		updatePrimaryTermSelector(taxonomy.name);

		taxonomyMetabox.on(
			'click',
			'input[type="checkbox"]',
			handleUpdateTerm(taxonomy.name)
		);

		taxonomyMetabox.on(
			'wpListAddEnd',
			`#${taxonomy.name}checklist`,
			handleListUpdate(taxonomy.name)
		);
	});

	/**
	 * Update Primary Term Selector on load.
	 *
	 * @param {string} taxonomy Taxonomy name.
	 */
	function updatePrimaryTermSelector(taxonomy) {
		const checkedItems = jQuery(
			`#${taxonomy}checklist input[type="checkbox"]`
		);

		if (1 > checkedItems.length) {
			return;
		}

		checkedItems.each(function (index, term) {
			term = jQuery(term);

			if (!term.is(':checked')) {
				removePrimarySelectOption(taxonomy, term.val());
			}
		});
	}

	/**
	 * Update Primary Taxonomy selector when terms are un/checked.
	 *
	 * @param {string} taxonomy Taxonomy name.
	 */
	function handleUpdateTerm(taxonomy) {
		return function () {
			if (jQuery(this).is(':checked')) {
				addPrimarySelectOption(
					taxonomy,
					jQuery(this).val(),
					jQuery(this).parent().text()
				);
			} else {
				removePrimarySelectOption(taxonomy, jQuery(this).val());
			}
		};
	}

	/**
	 * Update Primary Taxonomy selector when a new term is added.
	 *
	 * @param {string} taxonomy Taxonomy name.
	 */
	function handleListUpdate(taxonomy) {
		return function () {
			const checkedItems = jQuery(
				`#${taxonomy}checklist input[type="checkbox"]:checked`
			);

			if (1 > checkedItems.length) {
				return;
			}

			const primaryTermInput = jQuery(`#spc-primary-term-${taxonomy}`);

			checkedItems.each(function (index, term) {
				term = jQuery(term);

				if (
					!primaryTermInput.find(`option[value=${term.val()}]`).length
				) {
					addPrimarySelectOption(
						taxonomy,
						term.val(),
						term.parent().text()
					);
				}
			});
		};
	}

	/**
	 * Add option to Primary Taxonomy selector.
	 *
	 * @param {string} taxonomy Taxonomy name.
	 * @param {string} value    Term id.
	 * @param {string} text     Term name.
	 */
	function addPrimarySelectOption(taxonomy, value, text) {
		const primaryTermInput = jQuery(`#spc-primary-term-${taxonomy}`);

		const termOption = jQuery('<option></option>');
		termOption.prop('value', value);
		termOption.html(text.trim());

		primaryTermInput.append(termOption);
	}

	/**
	 * Remove option from Primary Taxonomy selector.
	 *
	 * @param {string} taxonomy Taxonomy name.
	 * @param {string} value    Term id.
	 */
	function removePrimarySelectOption(taxonomy, value) {
		const primaryTermInput = jQuery(`#spc-primary-term-${taxonomy}`);
		primaryTermInput.find(`option[value=${value}]`).remove();
	}
});
