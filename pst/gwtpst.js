/**
 * A Stand-alone Philippine Standard Time (PST) plugin script for synching on server time
 * this plugin prints a time widget that is in-sync on the Philippine Time Server base on PST
 * Author: Voltz Jeturian (jeturian@gmail.com, voltz.jeturian@icto.dost.gov.ph)
 * Project made possible by: AO39 Component of iGovPhil Project ICTO-DOST Philippines
 */
var gwtpst = gwtpst || function(elementId, options){
  // shim Date.now() function
  if (!Date.now){
    Date.now = function() { return new Date().getTime(); }
  }

  // initialize time difference
  this.time();
  defaultOptions = {
    url : '', // URL of the PST unix timestamp server
    refreshRate : 200, // refresh rate of pst timer
  };

  this.extend(defaultOptions, options);
  // validate everything before initializing
  // Copyright (c) 2010-2013 Diego Perini, MIT licensed
  // https://gist.github.com/dperini/729294
  // see also https://mathiasbynens.be/demo/url-regex
  // modified to allow protocol-relative URLs
  if(!/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(this.url)){
    throw new Error('Invalid URL inputted.');
    return false;
  }

  this._element = document.getElementById(elementId);
  if(typeof this._element == 'null'){
    throw new Error('Error! invalid elementId supplied. Element not found!');
    return false;
  }

  this.init(elementId);
};

gwtpst.prototype = {
  url : '',
  element : document.createElement("DIV"),
  time : function(){
    return this._now = new Date().getTime();
  },
  // _now : this.time(),
  refreshRate : 200,
  getDiff : function(){
    if(typeof this._now === "undefined" ){
      this.time();
    }
    this._delay = (new Date().getTime() - this._now);
    this.time(); // call time again

    // console.log(this._delay);
    return this._delay;
  },
  timeFormat : function(unixTime){
    var date = new Date(unixTime);
    var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    var month = monthNames[date.getMonth()];
    var day = date.getDate();
    var year = date.getFullYear();

    // Hours part from the timestamp
    var hours = date.getHours();
    var meridian = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;

    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    minutes = minutes.substr(-2);
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();
    seconds = seconds.substr(-2);

    // Will display time in "January 13, 2016 10:30:23 AM" format
    return month + ' ' + day + ', ' + year + ' ' + hours + ':' + minutes + ':' + seconds + ' ' + meridian;
  },
  // initialize and retrieve from the pst unix timestamp server
  init : function(elementId){
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    var scope = this;
    xmlHttp.onreadystatechange = function(){
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
        if (xmlHttp.responseText == "Not found"){
          throw new Error('No data found on ' + scope.url + '!');
        }
        else{
          // console.log(xmlHttp.responseText);
          // var info = eval ( "(" + xmlHttp.responseText + ")" );
          // No parsing necessary with JSON!        
          // info.jsonData[ 0 ].cmname;
          scope._serverTime = parseInt(xmlHttp.responseText)*1000;
          scope.getDiff();

          // run the timer
          scope.timer(scope);
        }
      }
    };
    xmlHttp.open("GET", this.url, true);
    xmlHttp.send(null);

    return this;
  },
  timer : function(gwhspst){
    var scope = gwhspst;
    scope._serverTime = scope._serverTime + scope.getDiff();
    // console.log('now time difference: ' + (Date.now() - now));
    scope.getDiff();
    scope._element.innerHTML = scope.timeFormat(scope._serverTime);
    // $('#timer').html(formattedTime);
    setTimeout(function(){
      scope.timer(scope)
    }, scope.refreshRate);
    // return gwhspst;
  },
  /**
   * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
   * @param obj1
   * @param obj2
   * @returns obj3 a new object based on obj1 and obj2
   */
  extend : function(a,b){
    // var c = {};
    for(var attr in a){ this[attr] = a[attr]; }
    for(var attr in b){ this[attr] = b[attr]; }
    return this;
  }
};

(function(d){
  function gwtpstInit(){
    var eId = 'gwt-pst';
    var timerId = eId + '-timer', sourceId = eId + '-source', timer, source, e = d.getElementById(eId);

    timer = d.createElement('div'); timer.id = timerId;
    source = d.createElement('div'); source.id = sourceId;
    source.innerHTML = 'Source: <a href="https://web.pagasa.dost.gov.ph/index.php/astronomy/philippine-standard-time" target="_blank">PST</a>';
    e.appendChild(timer);
    e.appendChild(source);
    
    var pst = new gwtpst(timerId, {
      // url : 'http://steph.i.gov.ph/time.php',
      // url : 'http://web.dev/pst/unix_time.php',
      url : '//cdn.i.gov.ph/pst/unix_time.php',
    });
  }

  gwtpstInit();
}(document));
