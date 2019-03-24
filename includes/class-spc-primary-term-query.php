<?php
/**
 * Primary Term Query.
 *
 * @package simple-primary-category
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Primary Term Query Class.
 */
class SPC_Primary_Term_Query {

	/**
	 * Get Posts by Primary Term.
	 *
	 * Performs a query to return posts by term.
	 *
	 * @param integer|string $term - Term id, slug or name.
	 * @param array          $args - Post query arguments.
	 * @return array|false|WP_Error
	 */
	public static function get_posts_by_primary_term( $term, $args = array() ) {
		$term_id = self::get_term_id( $term );

		if ( ! $term_id ) {
			return new WP_Error( 'noterm', __( 'Term does not exist.', 'simple-primary-category' ) );
		}

		$term = get_term( $term_id );

		$query_defaults = array(
			'post_type'      => 'post',
			'post_status'    => 'publish',
			'posts_per_page' => 10,
		);

		$meta_query = array(
			'key'   => 'spc_primary_' . $term->taxonomy,
			'value' => $term_id,
		);

		$query_args               = wp_parse_args( $args, $query_defaults );
		$query_args['meta_query'] = array( $meta_query );
		$query                    = new WP_Query( $query_args );

		if ( $query->post_count > 0 ) {
			return $query->posts;
		}

		return false;
	}

	/**
	 * Returns term id by checking if it exists.
	 *
	 * @param integer|string $term - Term id, slug or name.
	 * @return integer
	 */
	public static function get_term_id( $term ) {
		return term_exists( $term );
	}
}
