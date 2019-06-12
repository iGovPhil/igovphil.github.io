# PST script time-widget generator

## v1.0 - stable

### Description
This repository is a stand-alone Philippine Standard Time (PST) plugin script.

This script displays a time widget that is in-sync on the PST time server with a standard structure that can be easily embed to any location.

## Quickstart

Copy the script below to embbed the script.

    <div id="pst-container">
	<div>Philippine Standard Time:</div>
	<div id="pst-time"></div>
	<div><a href="http://pst.web.local/" id="pst-source" target="_blank">PST Source</a></div>
	</div>
	<script type="text/javascript">
	(function(d, eId) {
		var js, gjs = d.getElementById(eId);
		js = d.createElement('script'); js.id = 'gwt-pst-jsdk';
		js.src = "//pst.web.local/gwtpst.js?"+new Date().getTime();
		gjs.parentNode.insertBefore(js, gjs);
	}(document, 'pst-container'));
	
	var gwtpstReady = function(){
		new gwtpstTime('pst-time');
	}
	</script>

Which displays the following format:

	Philippine Standard Time:
	Monday, January 01, 1970, 3:22:18 PM

## Installation

You have to embed the gwt-pst-jsdk script in order to use and instantiate the **gwtpstTime** object.

	<script type="text/javascript" id="gwt-pst">
	(function(d, eId) {
		var js, gjs = d.getElementById(eId);
		js = d.createElement('script'); js.id = 'gwt-pst-jsdk';
		js.src = "//pst.web.local/gwtpst.js?"+new Date().getTime();
		gjs.parentNode.insertBefore(js, gjs);
	}(document, 'gwt-pst'));
	</script>

## Prerequisite

After the installation of the script, it is important that all instantiation of the **gwtpstTime** should be enclosed in **gwtpstReady** function as part of the JSONP implementation.

	var gwtpstReady = function(){
		new gwtpstTime('pst-time');
	}

## Usage

The **gwtpstTime** object can be instantiated by:

	var options = {};
	new gwtpstTime('elementId', options);

or by:

	var options = {elementId: 'elementId', otherOptions};
	new gwtpstTime(options);

**Note:** there should be atleast one **elementId** or **timerClass** options present when setting the options.

Additional options:

	{
		elementId: elementId, // elementId of the time widget
		timerClass: 'pst-timer', // timerCLass of the time widget, use this for multiple selection of timers
		format: 'dddd, mmmm dd, yyyy, h:MM:ss TT', // will display "Monday, February 16, 2016 10:30:23 AM" format
		prefix: '', // prefix text before time display
		suffix: '', // suffix text after time displa
		displaySource: true, // set to true to display the source is from official PST link
		keyboardTrap: true, // set to true to display time enclosed in anchor tag to avoid keyboard trap issue!
	}

### Single timer

	new gwtpstTime('single-timer', {format: "shortTime"});

Which selects element with **single-timer** ID and format it as:

	<div id="single-timer">
	<a href="#" style="text-decoration: none; color: inherit;">
	3:22 PM
	</a>
	</div>

Please see other date formats below.

### Multiple timers

	new gwtpstTime({
		timerClass: 'multiple-pst',
		format: 'h:MM:ss TT'
	});

Which selects all elements with **pst-example** class and format it and displays as:

	<div class="multiple-pst">
	<a href="#" style="text-decoration: none; color: inherit;">
	3:22:18 PM
	</a>
	</div>

### Keyboard traps

Keyboard traps is a type of accessibility issue which occurs when a person who uses a keyboard cannot move focus away from an interactive element or control using the keyboard alone. These are commonly found on elements that are frequently refreshed.

To avoid keyboard traps, we added **anchor** tag focus on the timer as a single element.

Since the **keyboardTrap** options are enabled by default you do not need to set the options when instantiating. However, you can also disable it to provide you better control.

	new gwtpstTime({
		timerClass: 'keyboardtrap-pst',
		format: 'HH:MM:ss',
		keyboardTrap, false
	});

Which selects all elements with **keyboardtrap-pst** class and format it as:

	<div class="keyboardtrap-pst">
	15:22:18
	</div>

**Note:** The anchor tag is removed and can be prone to keyboard trap.

### Date formats
* d - day of the month
* dd - day of the month with leading zeroes
* ddd - 3 letters abbreviation day of the week
* dddd - full word of the day of the week
* m - day of the month
* mm - day of the month with leading zeroes
* mmm - half month word
* mmmm - full word month
* h - hours in regular time
* hh - hours in regular time with leading zeroes
* H - hours in military time
* HH - hours in military time with leading zeroes
* s - number of seconds
* ss - number of seconds with leading zeroes
* l - number of mili seconds in 3 digits
* L - number of mili seconds in 2 digits
* t - Ante or Post meridian (am/pm) in single letter
* tt - Ante or Post meridian (am/pm)
* T - Capitalized Ante or Post meridian (AM/PM) in single letter
* TT - Capitalized Ante or Post meridian (AM/PM)
* Z - Abbrebeviated timezone
* o - GMT/UTC timezone offset
* S - Ordinal number suffix

### Common format strings:
* "default":      "ddd mmm dd yyyy HH:MM:ss",
* shortDate:      "m/d/yy",
* mediumDate:     "mmm d, yyyy",
* longDate:       "mmmm d, yyyy",
* fullDate:       "dddd, mmmm d, yyyy",
* shortTime:      "h:MM TT",
* mediumTime:     "h:MM:ss TT",
* longTime:       "h:MM:ss TT Z",
* isoDate:        "yyyy-mm-dd",
* isoTime:        "HH:MM:ss",
* isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
* isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"

### Formatting date

You can format date in any format that you needed.

	new gwtpstTime({
		timerClass: 'hoursFormats-pst',
		format: 'ht hhtt HT HHTT'
	});

Which selects all elements with **hoursFormats-pst** class and format it as:

	<div class="hoursFormats-pst">
	3p 03pm 15P 15PM
	</div>

## FUTURE UPDATES
- add default option for Light or Dark option
- add font option for the text output
- add support for timezone selection option
- ~~enable multiple time instance just by selecting ID~~
- ~~add more options for display~~

### Known bugs
- ~~selection id 'gwt-pst' may possibly changed on embed, add dynamic id selection~~
- ~~secure link may not possibly load unix_time.php of unsecured server~~

## CHANGE LOGS
##### 2017-10-11
- official release of PST v1-stable

##### 2016-02-16
- created dynamic PST class

##### 2016-02-21
- added auto embed script

##### 2016-03-11
- updated PST script to run JSONP
- added no cache to avoid static time content

##### 2016-03-14
- added different date formatting option
- added prefix and suffix
- enable multiple date containers

##### 2016-05-27
- fix missing gwt-pst id, changed to pst-time id
- fix no cache suffix for unix time
- updated other_date.html
- linked index.html to other_date.html
- updated sample output on index.html

##### 2017-01-23
- fix timezone issue for PST, set the Asia/Manila (GMT+8) as the default timezone
