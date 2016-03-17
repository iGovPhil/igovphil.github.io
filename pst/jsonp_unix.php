<?php
header('Content-Type: application/javascript');

// TODO: make sure that gwtpst_widget is declared
?>
(function(gwtpst){
	if(typeof gwtpst === "undefined" )
		return false;
	gwtpst.jsonp_response({time : <?php echo time(); ?>});
})(gwtpst_widget);