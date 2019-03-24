<?php
/**
 * SPC JS Templates.
 *
 * @package simple-primary-category
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
?>

<script type="text/html" id="tmpl-spc-select-primary-term">
	<p class="spc-primary-term-heading"><strong>Primary {{data.taxonomy.title}}</strong></p>
	<select class="spc-primary-term" id="spc-primary-term-{{data.taxonomy.name}}" name="spc_primary_term_{{data.taxonomy.name}}">
		<option value="-1">— Select Primary {{data.taxonomy.title}} —</option>
		<# _( data.taxonomy.terms ).each( function( term ) { #>
			<option value="{{term.id}}"
			<# if ( data.taxonomy.primary === term.id ) { #>
				selected
			<# } #>
			>{{term.name}}</option>
		<# }); #>
	</select>
	<?php wp_nonce_field( 'spc-save-primary-term', 'spc_save_primary_{{data.taxonomy.name}}_nonce' ); ?>
</script>
