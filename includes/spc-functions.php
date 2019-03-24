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
 * @param integer|string $term     - Term id, slug or name.
 * @param string         $taxonomy - Taxonomy slug.
 * @param array          $args     - Post query arguments.
 * @return array|false|WP_Error
 */
function spc_get_primary_term_posts( $term, $taxonomy = '', $args = array() ) {
	return SPC_Primary_Term_Query::get_posts_by_primary_term( $term, $taxonomy, $args );
}

/**
 * Primary Term Posts Query Shortcode.
 *
 * @param array $atts - Array of attributes.
 */
function spc_primary_term_shortcode( $atts ) {
	// Get shortcode args.
	$args = shortcode_atts(
		array(
			'term'           => 0,
			'taxonomy'       => '',
			'post_type'      => 'post',
			'post_status'    => 'publish',
			'posts_per_page' => 10,
		), $atts
	);

	// Post query arguments from shortcode.
	$post_query_args = array(
		'post_type'      => $args['post_type'],
		'post_status'    => $args['post_status'],
		'posts_per_page' => $args['posts_per_page'],
	);

	// Get term and convert according to input type.
	$term = intval( $args['term'] );

	if ( 0 === $term ) {
		// Term is slug or name.
		$term = $args['term'];
	}

	// Query posts by term and relevant arguments.
	$primary_term_posts = spc_get_primary_term_posts( $term, $args['taxonomy'], $post_query_args );

	// Action hook to display queries posts in themes.
	do_action( 'spc_primary_term_posts_display', $primary_term_posts );
}
add_shortcode( 'spc_primary_term_posts', 'spc_primary_term_shortcode' );
