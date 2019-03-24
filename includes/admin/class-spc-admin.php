<?php
/**
 * Simple Primary Category Admin Class.
 *
 * @package simple-primary-category
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * SPC Admin Class.
 */
class SPC_Admin {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->register_hooks();
	}

	/**
	 * Register Hooks.
	 */
	public function register_hooks() {
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_script' ), 10, 1 );
		add_action( 'admin_footer', array( $this, 'include_selection_template' ) );
		add_action( 'save_post', array( $this, 'save_primary_terms' ), 10, 2 );
	}

	/**
	 * Enqueue Script.
	 *
	 * @param string $hook_suffix - Page hook suffix.
	 */
	public function enqueue_script( $hook_suffix ) {
		if ( ! $this->is_post_edit( $hook_suffix ) ) {
			return;
		}

		$post_taxonomies = $this->get_post_taxonomies();

		if ( empty( $post_taxonomies ) ) {
			return;
		}

		$suffix  = ( defined( 'WP_DEBUG' ) && WP_DEBUG ) ? '' : '.min';
		$version = ( defined( 'WP_DEBUG' ) && WP_DEBUG ) ? filemtime( SPC_BASE_DIR . 'assets/js/spc-taxonomy.js' ) : SPC_VERSION;

		wp_register_script(
			'spc-taxonomy',
			SPC_BASE_URL . 'assets/js/spc-taxonomy' . $suffix . '.js',
			array( 'jquery' ),
			$version,
			true
		);
		wp_enqueue_script( 'spc-taxonomy' );

		wp_localize_script(
			'spc-taxonomy', 'spcData', array(
				'taxonomies' => array_map( array( $this, 'get_taxonomies_for_js' ), $post_taxonomies ),
			)
		);
	}

	/**
	 * Include Primary Term Selection Template.
	 */
	public function include_selection_template() {
		if ( ! $this->is_post_edit() ) {
			return;
		}

		require_once dirname( __FILE__ ) . '/spc-templates.php';
	}

	/**
	 * Save primary terms on post submit.
	 *
	 * @param integer $post_id - Post id.
	 * @param WP_Post $post    - Post object.
	 */
	public function save_primary_terms( $post_id, $post ) {
		$post_taxonomies = $this->get_post_taxonomies( $post_id );

		foreach ( $post_taxonomies as $post_taxonomy ) {
			$this->save_primary_term( $post_id, $post_taxonomy );
		}
	}

	/**
	 * Returns Primary Term of the editing post.
	 *
	 * @param string $taxonomy - Taxonomy name.
	 * @return integer
	 */
	public function get_primary_term( $taxonomy ) {
		$primary_term = new SPC_Primary_Term( $this->get_current_post_id(), $taxonomy );
		return $primary_term->get_primary_term();
	}

	/**
	 * Save Primary Term of a post.
	 *
	 * @param integer     $post_id  - Post id.
	 * @param WP_Taxonomy $taxonomy - Taxonomy object.
	 */
	public function save_primary_term( $post_id, $taxonomy ) {
		$primary_term = isset( $_POST[ 'spc_primary_term_' . $taxonomy->name ] ) ? (int) sanitize_text_field( wp_unslash( $_POST[ 'spc_primary_term_' . $taxonomy->name ] ) ) : false;

		if ( ! $primary_term ) {
			return;
		}

		check_admin_referer( 'spc-save-primary-term', 'spc_save_primary_' . $taxonomy->name . '_nonce' );

		$spc_primary_term = new SPC_Primary_Term( $post_id, $taxonomy->name );
		$spc_primary_term->save_primary_term( $primary_term );
	}

	/**
	 * Returns true if the current page is post edit page.
	 *
	 * @param string $hook_suffix - Page hook suffix.
	 * @return boolean
	 */
	public function is_post_edit( $hook_suffix = '' ) {
		if ( '' === $hook_suffix ) {
			global $pagenow;
			$hook_suffix = $pagenow;
		}

		return 'post-new.php' === $hook_suffix || 'post.php' === $hook_suffix;
	}

	/**
	 * Get Post Type Taxonomies.
	 *
	 * @param string $post_id - Post id.
	 * @return array
	 */
	public function get_post_taxonomies( $post_id = 0 ) {
		if ( ! $post_id ) {
			$post_id = $this->get_current_post_id();
		}

		$taxonomies = wp_cache_get( 'spc_post_taxonomies_' . $post_id, 'spc' );

		if ( false !== $taxonomies ) {
			return $taxonomies;
		}

		$post_type  = get_post_type( $post_id );
		$taxonomies = get_object_taxonomies( $post_type, 'objects' );

		foreach ( $taxonomies as $taxonomy_name => $taxonomy ) {
			if ( ! $taxonomy->hierarchical ) {
				unset( $taxonomies[ $taxonomy_name ] );
			}
		}

		wp_cache_set( 'spc_post_taxonomies_' . $post_id, $taxonomies, 'spc' );

		return $taxonomies;
	}

	/**
	 * Return Current Post ID.
	 *
	 * @return integer
	 */
	public function get_current_post_id() {
		return (int) filter_input( INPUT_GET, 'post', FILTER_SANITIZE_NUMBER_INT );
	}

	/**
	 * Get taxonomy data for JS in array.
	 *
	 * @param WP_Taxonomy $taxonomy - WP Taxonomy object.
	 * @return array
	 */
	public function get_taxonomies_for_js( $taxonomy ) {
		return array(
			'name'    => $taxonomy->name,
			'title'   => $taxonomy->labels->singular_name,
			'primary' => $this->get_primary_term( $taxonomy->name ),
			'terms'   => array_map( array( $this, 'get_terms_for_js' ), get_terms( $taxonomy->name ) ),
		);
	}

	/**
	 * Get term data for JS in array.
	 *
	 * @param WP_Term $term - WP term object.
	 * @return array
	 */
	public function get_terms_for_js( $term ) {
		return array(
			'id'   => $term->term_id,
			'name' => $term->name,
		);
	}
}
new SPC_Admin();
