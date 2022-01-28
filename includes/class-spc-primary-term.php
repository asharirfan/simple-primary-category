<?php
/**
 * SPC Primary Term Class.
 *
 * @package simple-primary-category
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * SPC Primary Term.
 *
 * This class manages primary terms as individual objects.
 */
class SPC_Primary_Term {

	/**
	 * Primary Term Post ID.
	 *
	 * @var integer
	 */
	private $post_id = null;

	/**
	 * Primary Term Taxonomy Name.
	 *
	 * @var string
	 */
	private $taxonomy = null;

	/**
	 * Primary Term Meta Key.
	 *
	 * @var string
	 */
	private $primary_meta_key = null;

	/**
	 * Constructor.
	 *
	 * @param integer $post_id  - Post ID.
	 * @param string  $taxonomy - Taxonomy name.
	 */
	public function __construct( $post_id, $taxonomy ) {
		$this->post_id          = $post_id;
		$this->taxonomy         = $taxonomy;
		$this->primary_meta_key = 'spc_primary_' . $taxonomy;
	}

	/**
	 * Get Post Primary Term.
	 *
	 * @return integer|boolean
	 */
	public function get_primary_term() {

		$primary_term = (int) get_post_meta(
			$this->post_id,
			$this->primary_meta_key,
			true
		);

		$post_terms = $this->get_post_terms();

		if (
			! in_array(
				$primary_term,
				wp_list_pluck( $post_terms, 'term_id' ),
				true
			)
		) {
			$primary_term = false;
		}

		return $primary_term;
	}

	/**
	 * Save Post Primary Term.
	 *
	 * @param integer $primary_term_id - Primary term id.
	 */
	public function save_primary_term( $primary_term_id ) {
		update_post_meta(
			$this->post_id,
			$this->primary_meta_key,
			$primary_term_id
		);
	}

	/**
	 * Get Post Terms.
	 *
	 * @return array
	 */
	public function get_post_terms() {
		$terms = get_the_terms( $this->post_id, $this->taxonomy );

		if ( ! $terms || is_wp_error( $terms ) ) {
			return array();
		}

		return $terms;
	}
}
