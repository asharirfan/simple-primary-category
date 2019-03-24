<?php
/**
 * SPC Functions.
 *
 * @package simple-primary-category
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Returns an array of WP_Posts object.
 *
 * @param integer|string $term - Term id, slug or name.
 * @param array          $args - Post query arguments.
 * @return array|false|WP_Error
 */
function spc_get_primary_term_posts( $term, $args = array() ) {
	return SPC_Primary_Term_Query::get_posts_by_primary_term( $term, $args );
}
