=== Simple Primary Category ===
Contributors: mrasharirfan
Tags: category,primary,taxonomy
Requires at least: 5.0
Tested up to: 6.1
Requires PHP: 7.3
Stable tag: 1.1.0
License: GPL3+
License URI: https://www.gnu.org/licenses/gpl-3.0.txt

A light-weight WordPress plugin to assign primary category to posts and custom post types.

== Installation ==
1. Download the plugin.
2. Login to your WordPress website dashboard.
3. Navigate to Dashboard > Plugins.
4. Click Add New and then Upload Plugin.
5. Browse to the file, select it, and click Install Now.
6. Click Activate Plugin once prompted.

== How to Use ==
1. Browse to any post or custom post type in WordPress admin.
2. Check the taxonomies that you want to assign to it.
3. Select the respective primary taxonomies.
4. Save the post.
5. Use this shortcode to query the posts: `spc_primary_term_posts`.
6. Use the action hook — `spc_display_primary_term_posts` — to display the queried posts in your theme.

== Screenshots ==
1. Gutenberg
2. Classic Editor

== Changelog ==
= Version 1.0.0
* Initial Release
