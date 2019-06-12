<?php
header('Content-Type: application/javascript');
// make sure that gwtpst_widget is declared
$time = time();
$timezone = -480; // GMT+8 in minutes
?>
(function(gwtpst){
	if(typeof gwtpst === "undefined" )
		return false;
	gwtpst._jsonpResponseProcess(function(){
		return {time: <?php echo $time; ?>, timezone: <?php echo $timezone ?>}
	});
})(gwtPstWidget);