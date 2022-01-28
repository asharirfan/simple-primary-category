<?php
/**
 * Plugin Name: Simple Primary Category
 * Plugin URI:  https://github.com/asharirfan/simple-primary-category
 * Description: A light-weight WordPress plugin to assign primary category to posts and custom post types.
 * Author:      mrasharirfan
 * Author URI:  https://AsharIrfan.com/
 * Version:     1.0.0
 * License:     GPL3+
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 *
 * @package simple-primary-category
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Define plugin file.
if ( ! defined( 'SPC_PLUGIN_FILE' ) ) {
	define( 'SPC_PLUGIN_FILE', __FILE__ );
}

// Include SPC main class file.
if ( ! class_exists( 'Simple_Primary_Category' ) ) {
	include_once dirname( __FILE__ ) . '/includes/class-simple-primary-category.php';
}

/**
 * Main Plugin Instance.
 *
 * @return Simple_Primary_Category
 */
function wpspc() {
	return Simple_Primary_Category::instance();
}
wpspc();
