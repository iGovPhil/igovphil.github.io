# Goverment Website Template (GWT) footer script generator
**Authored by: Voltz Jeturian voltz.jeturian@icto.dost.gov.ph**

## ANNOUNCEMENT
Please be informed that the footer.js hosted at **code.google.com** will **no longer be available** in the near future. Please see this link for more details: http://google-opensource.blogspot.com/2015/03/farewell-to-google-code.html. In this case, the code will be migrated to cdn.i.gov.ph. **Every website** that uses the GWT-footer are **urged** to modify the script. For those who are using GWT for the recommended CMS (Wordpress, Joomla, Drupal), we will be releasing a new version of the template for your website's use.

>**Modify this line:**
>```
>js.src = "http://gwt-footer.googlecode.com/git/footer.js";
>```
>**To this line:**
>```
>js.src = "//cdn.i.gov.ph/gwt-footer/footer.js";
>```

#### v1-stable

The gwt-footer is a footer script generator for the Government Website Template (GWT). The main purpose of a footer generator is to provide a uniform look and feel and to comply with the guidelines on the standard footer. The footer generator automatically retrieves the updated version of html codes of the footer template to ensure that the contents and the links are up to date. We recommend the use of the footer script for **websites using static html** and **custom applications**. Those who are using the GWT for the recommended CMS will automatically use the gwt-footer script.

### How to add footer generator
To add the footer generator on your template, simply add this syntax after the agency footer region and before the closing &lt;body&gt; tag.

```
<div id="gwt-standard-footer"></div>
<script type="text/javascript">
(function(d, s, id) {
  var js, gjs = d.getElementById('gwt-standard-footer');

	js = d.createElement(s); js.id = id;
	js.src = "//cdn.i.gov.ph/gwt-footer/footer.js";
	gjs.parentNode.insertBefore(js, gjs);
}(document, 'script', 'gwt-footer-jsdk'));
</script>
```

### Known Bugs
- footer.js not loading in https connection

For support, comments, and suggestions, and if you find any bugs, please email us at helpdesk@i.gov.ph.

###### CHANGE LOGS
**06-25-2014**
- created GWT footer script generator

**07-01-2014**
- added automated script that generates template from source code
- added embed script sample to index.html for sample

**07-29-2014**
- added autoresizer script

**08-13-2014**
- release to Beta version

**10-29-2014**
- release to Stable version

**03-16-2015**
- migrated the the source to cdn.i.gov.ph

**05-14-2015**
- replaced the "http://" static content into "//" to fix the https not loading issue.
