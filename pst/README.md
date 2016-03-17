# PST script time-widget generator
**Authored by: Voltz Jeturian voltz.jeturian@icto.dost.gov.ph**

## v0.5 - Beta

### Note
This version is still under **Beta** version and still an experimental version. Use the script in staging and testing accounts only

### Description
This repository is a stand-alone Philippine Standard Time (PST) plugin script for synching on server time

This script prints a time widget that is in-sync on the PST with a standard structure that can be easily embed to any location

### Pst Widget Generator
To add the PST on your template, simply add this syntax after the agency footer region and before the closing &lt;body&gt; tag.


```
<div id="gwt-pst"></div>
<script type="text/javascript">
(function(d, eId) {
  var js, gjs = d.getElementById(eId);
  js = d.createElement('script'); js.id = 'gwt-pst-jsdk';
  js.src = "//gwhs.i.gov.ph/pst/gwtpst.js?"+new Date().getTime();
  gjs.parentNode.insertBefore(js, gjs);
}(document, 'gwt-pst'));

var gwtpstReady = function(){
  firstPst = new gwtpstTime('pst-time');
}
</script>
```
### Date format:
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

## FUTURE UPDATES
- add default option for Light or Dark option
- add font option for the text output
- ~~enable multiple time instance just by selecting ID~~
- ~~add more options for display~~

### Known bugs
- ~~selection id 'gwt-pst' may possibly changed on embed, add dynamic id selection~~
- ~~secure link may not possibly load unix_time.php of unsecured server~~

## CHANGE LOGS
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

