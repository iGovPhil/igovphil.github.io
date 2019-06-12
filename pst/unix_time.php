<?php
/*
* security issue complication when using access-control-allow-origin
* http://stackoverflow.com/questions/12001269/what-are-the-security-risks-of-setting-access-control-allow-origin
*/
header('Access-Control-Allow-Origin:*');
// header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, POST');
// //header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, x-requested-with, Content-Type, Content-Range, Content-Disposition, Content-Description');
header('Access-Control-Request-Headers:access-control-allow-origin, content-type');
header('Content-Type: text/plain');
// Access-Control-Allow-Origin:*
// Cache-Control:no-cache
// Connection:keep-alive

/*
* note: only prints output are allowed after the headers
*/

// debug, simulates delay loading
// sleep(2);
echo time();