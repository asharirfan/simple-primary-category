/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _spc_taxonomy_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./spc-taxonomy.js */ \"./src/js/spc-taxonomy.js\");\n/* harmony import */ var _spc_taxonomy_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_spc_taxonomy_js__WEBPACK_IMPORTED_MODULE_0__);\n\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/spc-taxonomy.js":
/*!********************************!*\
  !*** ./src/js/spc-taxonomy.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * SPC Taxonomy Selection Script.\n *\n * @package simple-primary-category\n */\njQuery(document).ready(function () {\n  var taxonomies = spcData.taxonomies;\n  var spcPrimaryTermInput = wp.template('spc-select-primary-term');\n  /**\n   * Go through each post taxonomy and add relevant\n   * primary taxonomy selector and handlers to each box.\n   */\n\n  jQuery(_.values(taxonomies)).each(function (index, taxonomy) {\n    var taxonomyMetabox = jQuery(\"#taxonomy-\".concat(taxonomy.name));\n    var primaryTermInputHtml = spcPrimaryTermInput({\n      taxonomy: taxonomy\n    });\n    taxonomyMetabox.append(primaryTermInputHtml);\n    updatePrimaryTermSelector(taxonomy.name);\n    taxonomyMetabox.on('click', 'input[type=\"checkbox\"]', handleUpdateTerm(taxonomy.name));\n    taxonomyMetabox.on('wpListAddEnd', \"#\".concat(taxonomy.name, \"checklist\"), handleListUpdate(taxonomy.name));\n  });\n  /**\n   * Update Primary Term Selector on load.\n   *\n   * @param {string} taxonomy Taxonomy name.\n   */\n\n  function updatePrimaryTermSelector(taxonomy) {\n    var checkedItems = jQuery(\"#\".concat(taxonomy, \"checklist input[type=\\\"checkbox\\\"]\"));\n\n    if (1 > checkedItems.length) {\n      return;\n    }\n\n    checkedItems.each(function (index, term) {\n      term = jQuery(term);\n\n      if (!term.is(':checked')) {\n        removePrimarySelectOption(taxonomy, term.val());\n      }\n    });\n  }\n  /**\n   * Update Primary Taxonomy selector when terms are un/checked.\n   *\n   * @param {string} taxonomy Taxonomy name.\n   */\n\n\n  function handleUpdateTerm(taxonomy) {\n    return function () {\n      if (jQuery(this).is(':checked')) {\n        addPrimarySelectOption(taxonomy, jQuery(this).val(), jQuery(this).parent().text());\n      } else {\n        removePrimarySelectOption(taxonomy, jQuery(this).val());\n      }\n    };\n  }\n  /**\n   * Update Primary Taxonomy selector when a new term is added.\n   *\n   * @param {string} taxonomy Taxonomy name.\n   */\n\n\n  function handleListUpdate(taxonomy) {\n    return function () {\n      var primaryTermInput = jQuery(\"#spc-primary-term-\".concat(taxonomy));\n      var checkedItems = jQuery(\"#\".concat(taxonomy, \"checklist input[type=\\\"checkbox\\\"]:checked\"));\n\n      if (1 > checkedItems.length) {\n        return;\n      }\n\n      checkedItems.each(function (index, term) {\n        term = jQuery(term);\n\n        if (!primaryTermInput.find(\"option[value=\".concat(term.val(), \"]\")).length) {\n          addPrimarySelectOption(taxonomy, term.val(), term.parent().text());\n        }\n      });\n    };\n  }\n  /**\n   * Add option to Primary Taxonomy selector.\n   *\n   * @param {string} taxonomy Taxonomy name.\n   * @param {string} value Term id.\n   * @param {string} text Term name.\n   */\n\n\n  function addPrimarySelectOption(taxonomy, value, text) {\n    var primaryTermInput = jQuery(\"#spc-primary-term-\".concat(taxonomy));\n    var termOption = jQuery('<option></option>');\n    termOption.prop('value', value);\n    termOption.html(text.trim());\n    primaryTermInput.append(termOption);\n  }\n  /**\n   * Remove option from Primary Taxonomy selector.\n   *\n   * @param {string} taxonomy Taxonomy name.\n   * @param {string} value Term id.\n   */\n\n\n  function removePrimarySelectOption(taxonomy, value) {\n    var primaryTermInput = jQuery(\"#spc-primary-term-\".concat(taxonomy));\n    primaryTermInput.find(\"option[value=\".concat(value, \"]\")).remove();\n  }\n});\n\n//# sourceURL=webpack:///./src/js/spc-taxonomy.js?");

/***/ })

/******/ });