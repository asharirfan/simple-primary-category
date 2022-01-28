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

	return SPC_Primary_Term_Query::get_posts_by_primary_term(
		$term,
		$taxonomy,
		$args
	);
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
		),
		$atts
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
	$primary_term_posts = spc_get_primary_term_posts(
		$term,
		$args['taxonomy'],
		$post_query_args
	);

	// Action hook to display queries posts in themes.
	do_action( 'spc_display_primary_term_posts', $primary_term_posts );
}
add_shortcode( 'spc_primary_term_posts', 'spc_primary_term_shortcode' );

/**
 * Register SPC meta for REST API.
 *
 * @return void
 */
function spc_register_meta_for_rest() {

	$post_types     = get_post_types();
	$taxonomies     = array();
	$excluded_types = apply_filters(
		'wpc_primary_term_rest_excluded_post_types',
		array(
			'attachment',
			'revision',
			'nav_menu_item',
			'custom_css',
			'customize_changeset',
			'oembed_cache',
			'user_request',
			'wp_block',
		)
	);

	foreach ( $post_types as $post_type ) {
		if ( in_array( $post_type, $excluded_types, true ) ) {
			continue;
		}

		$taxonomies = get_object_taxonomies( $post_type, 'objects' );

		if ( ! empty( $taxonomies ) && is_array( $taxonomies ) ) {
			foreach ( $taxonomies as $taxonomy_name => $taxonomy ) {
				if ( ! $taxonomy->hierarchical ) {
					continue;
				}

				register_post_meta(
					$post_type,
					'spc_primary_' . $taxonomy_name,
					array(
						'show_in_rest' => true,
						'single'       => true,
						'type'         => 'integer',
					)
				);
			}
		}
	}
}
add_action( 'init', 'spc_register_meta_for_rest', 9999 );
