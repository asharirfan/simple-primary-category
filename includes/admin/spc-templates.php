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

<style>
	.spc-primary-term select { width: 100% }
</style>

<script type="text/html" id="tmpl-spc-select-primary-term">
	<div class="spc-primary-term">
		<p class="spc-primary-term-heading"><strong>Primary {{data.taxonomy.title}}</strong></p>
		<select id="spc-primary-term-{{data.taxonomy.name}}" name="spc_primary_term_{{data.taxonomy.name}}">
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
	</div>
</script>
