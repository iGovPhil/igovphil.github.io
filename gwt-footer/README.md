# Goverment Website Template (GWT) footer script generator

## v1.1-stable

The gwt-footer is a footer script generator for the Government Website Template (GWT). The main purpose of a footer generator is to provide a uniform look and feel and to comply with the guidelines on the standard footer. The footer generator automatically retrieves the updated version of html codes of the footer template to ensure that the contents and the links are up to date. We recommend the use of the footer script for **websites using static html** and **custom applications**. Those who are using the GWT for the recommended CMS will automatically use the gwt-footer script.

## How to add footer generator
To add the footer generator on your template, simply add this syntax after the agency footer region and before the closing **body** tag.

	<div id="gwt-standard-footer"></div>
	<script type="text/javascript">
	(function(d, s, id) {
		var js, gjs = d.getElementById('gwt-standard-footer');
	
		js = d.createElement(s); js.id = id;
		js.src = "//gwhs.i.gov.ph/gwt-footer/footer.js";
		gjs.parentNode.insertBefore(js, gjs);
	}(document, 'script', 'gwt-footer-jsdk'));
	</script>

### Known Bugs
- selection id **gwt-footer-jsdk** may possibly changed on embed, add dynamic id selection

For support, comments, and suggestions, and if you find any bugs, please email us at helpdesk@i.gov.ph.

###### CHANGE LOGS
**03-17-2016**
- moved hosting of gwt-footer to gwhs.i.gov.ph/gwt-footer

**05-14-2015**
- replaced the "http://" static content into "//" to fix the https not loading issue.

**03-16-2015**
- migrated the the source to cdn.i.gov.ph

**10-29-2014**
- release to Stable version

**08-13-2014**
- release to Beta version

**07-29-2014**
- added autoresizer script

**07-01-2014**
- added automated script that generates template from source code
- added embed script sample to index.html for sample

**06-25-2014**
- created GWT footer script generator
