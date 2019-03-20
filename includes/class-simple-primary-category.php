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
class Simple_Primary_Category {

	/**
	 * SPC Version.
	 *
	 * @var string
	 */
	public $version = '0.1';

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
		$this->define( 'SPC_BASE_URL', trailingslashit( plugin_dir_url( SPC_PLUGIN_FILE ) ) );
		$this->define( 'SPC_BASE_DIR', trailingslashit( plugin_dir_path( SPC_PLUGIN_FILE ) ) );
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
	public function includes() {}
}
