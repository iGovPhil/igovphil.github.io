<?php
/*
* security issue complication when using access-control-allow-origin
* http://stackoverflow.com/questions/12001269/what-are-the-security-risks-of-setting-access-control-allow-origin
*/
header('Access-Control-Allow-Origin: *');
/*
* note: only prints output are allowed after the headers
*/

// debug, simulates delay loading
// sleep(2);
echo time();