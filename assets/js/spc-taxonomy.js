"use strict";

/**
 * SPC Taxonomy Selection Script.
 *
 * @package simple-primary-category
 */
jQuery(document).ready(function () {
  var taxonomies = spcData.taxonomies;
  var spcPrimaryTermInput = wp.template('spc-select-primary-term');
  /**
   * Go through each post taxonomy and add relevant
   * primary taxonomy selector and handlers to each box.
   */

  jQuery(_.values(taxonomies)).each(function (index, taxonomy) {
    var taxonomyMetabox = jQuery("#taxonomy-".concat(taxonomy.name));
    var primaryTermInputHtml = spcPrimaryTermInput({
      taxonomy: taxonomy
    });
    taxonomyMetabox.append(primaryTermInputHtml);
    updatePrimaryTermSelector(taxonomy.name);
    taxonomyMetabox.on('click', 'input[type="checkbox"]', handleUpdateTerm(taxonomy.name));
    taxonomyMetabox.on('wpListAddEnd', "#".concat(taxonomy.name, "checklist"), handleListUpdate(taxonomy.name));
  });
  /**
   * Update Primary Term Selector on load.
   *
   * @param {string} taxonomy Taxonomy name.
   */

  function updatePrimaryTermSelector(taxonomy) {
    var checkedItems = jQuery("#".concat(taxonomy, "checklist input[type=\"checkbox\"]"));

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
        addPrimarySelectOption(taxonomy, jQuery(this).val(), jQuery(this).parent().text());
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
      var primaryTermInput = jQuery("#spc-primary-term-".concat(taxonomy));
      var checkedItems = jQuery("#".concat(taxonomy, "checklist input[type=\"checkbox\"]:checked"));

      if (1 > checkedItems.length) {
        return;
      }

      checkedItems.each(function (index, term) {
        term = jQuery(term);

        if (!primaryTermInput.find("option[value=".concat(term.val(), "]")).length) {
          addPrimarySelectOption(taxonomy, term.val(), term.parent().text());
        }
      });
    };
  }
  /**
   * Add option to Primary Taxonomy selector.
   *
   * @param {string} taxonomy Taxonomy name.
   * @param {string} value Term id.
   * @param {string} text Term name.
   */


  function addPrimarySelectOption(taxonomy, value, text) {
    var primaryTermInput = jQuery("#spc-primary-term-".concat(taxonomy));
    var termOption = jQuery('<option></option>');
    termOption.prop('value', value);
    termOption.html(text.trim());
    primaryTermInput.append(termOption);
  }
  /**
   * Remove option from Primary Taxonomy selector.
   *
   * @param {string} taxonomy Taxonomy name.
   * @param {string} value Term id.
   */


  function removePrimarySelectOption(taxonomy, value) {
    var primaryTermInput = jQuery("#spc-primary-term-".concat(taxonomy));
    primaryTermInput.find("option[value=".concat(value, "]")).remove();
  }
});