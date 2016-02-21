# PST script time-widget generator
**Authored by: Voltz Jeturian voltz.jeturian@icto.dost.gov.ph**

#### v0.1 - Beta

##### Note
This version is still under **Beta** version and still an experimental version. Use the script in staging and testing accounts only

##### Description
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
  // point temporarily to localhost
  js.src = "//igovphil.github.io/pst/gwtpst.js";
  gjs.parentNode.insertBefore(js, gjs);
}(document, 'gwt-pst'));
</script>
```

## FUTURE UPDATES
- add default option for Light or Dark option
- add font option for the text output

### Known bugs
- selection id 'gwt-footer-jsdk' may possibly changed on embed, add dynamic id selection

###### CHANGE LOGS
**2016-02-16**
- created dynamic PST class

**2016-02-21**
- added auto embed script
