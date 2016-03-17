<?php
header('Content-Type: application/javascript');

// TODO: make sure that gwtpst_widget is declared
?>
(function(gwtpst){
	if(typeof gwtpst === "undefined" )
		return false;
	gwtpst._jsonpResponseProcess(function(){
		return {time: <?php echo time(); ?>}
	});
})(gwtPstWidget);