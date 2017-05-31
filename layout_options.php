<?php 
function add_layout_options() {
	
	// Add a javascript file to all pages regardless of mode
	$ci =& get_instance();
	$ci->template->add_js('system/application/hooks/layout_options.js');
	
}
?>