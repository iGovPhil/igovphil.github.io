// TODO: check if Liferay, AUI is defined

// If liferay, AUI exists call ready function, else run as native

FooterIframeInit = function(){
  (function(d, fid){
  // embed iframe resizer

(function(d, s, id) {
  var js, gjs = d.getElementById('gwt-standard-footer');

  js = d.createElement(s); js.id = id;
  js.src = "//igovphil.github.io/gwt-footer/js/iframeResizer.min.js";
  gjs.parentNode.insertBefore(js, gjs);
}(document, 'script', 'iframeResizer-container'));

  /**
   * @file
   * Government(PH) Website template footer generator script file
   * @author DOST-ICTO gwtsupport@i.gov.ph
   */
    var f = d.getElementById(fid);
    f.innerHTML = '<iframe src="//igovphil.github.io/gwt-footer/footer-source-ngp.html" id="footer-gwt-frame" width="100%" scrolling="no" style="border: 0; min-height: 371px" ></iframe>';
    var i = d.getElementById('footer-gwt-frame');

    i.style.marginBottom = '-3px';
    
    iFrameResize({
      autoResize: true,
      enablePublicMethods     : true,
      checkOrigin: false
    }, '#footer-gwt-frame');

  }(document, 'gwt-standard-footer'));  
}

if(typeof Liferay === "function" && typeof AUI === "function"){
  (function(Liferay, AUI){
  AUI().ready('footer-module', function(A){
    FooterIframeInit();
  });
  })(Liferay, AUI);
}
else{
  FooterIframeInit();
}