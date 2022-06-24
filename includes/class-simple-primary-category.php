<?php
/**
 * Simple Primary Category.
 *
 * Main plugin class file.
 *
 * @package simple-primary-category
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Main Plugin Class.
 */
final class Simple_Primary_Category {

	/**
	 * SPC Version.
	 *
	 * @var string
	 */
	public $version = '1.1.0';

	/**
	 * Single Plugin Instance.
	 *
	 * @var Simple_Primary_Category
	 */
	protected static $instance = null;

	/**
	 * Returns SPC Instance.
	 *
	 * Ensures only one instance of the plugin is loaded or can be loaded.
	 *
	 * @return Simple_Primary_Category
	 */
	public static function instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Contructor.
	 */
	public function __construct() {
		$this->define_constants();
		$this->includes();
	}

	/**
	 * Define constants.
	 */
	public function define_constants() {
		$this->define( 'SPC_VERSION', $this->version );
		$this->define( 'SPC_BASE_NAME', plugin_basename( SPC_PLUGIN_FILE ) );
		$this->define(
			'SPC_BASE_URL',
			trailingslashit( plugin_dir_url( SPC_PLUGIN_FILE ) )
		);
		$this->define(
			'SPC_BASE_DIR',
			trailingslashit( plugin_dir_path( SPC_PLUGIN_FILE ) )
		);
	}

	/**
	 * Define constant if not defined already.
	 *
	 * @param string $name  - Constant name.
	 * @param string $value - Constant value.
	 */
	public function define( $name, $value ) {
		if ( ! defined( $name ) ) {
			define( $name, $value );
		}
	}

	/**
	 * Include plugin files.
	 */
	public function includes() {
		require_once dirname( __FILE__ ) . '/class-spc-primary-term.php';
		require_once dirname( __FILE__ ) . '/class-spc-primary-term-query.php';
		require_once dirname( __FILE__ ) . '/spc-functions.php';

		if ( is_admin() ) {
			require_once dirname( __FILE__ ) . '/admin/class-spc-admin.php';
		}
	}

	/**
	 * Error Logger
	 *
	 * Logs given input into debug.log file in debug mode.
	 *
	 * @param mixed $message - Error message.
	 */
	public function error_log( $message ) {
		if ( WP_DEBUG === true ) {
			if ( is_array( $message ) || is_object( $message ) ) {
				error_log( print_r( $message, true ) );
			} else {
				error_log( $message );
			}
		}
	}
}
