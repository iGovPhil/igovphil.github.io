/**
 * A Stand-alone Philippine Standard Time (PST) plugin script for synching the display time to a more standard PST time
 * this plugin prints a time widget that is in-sync on the Philippine Time Server
 * Author: Voltz Jeturian (jeturian@gmail.com, voltz.jeturian@dict.gov.ph)
 * Project made possible by: AO39 Component of iGovPhil Project ICTO-DOST Philippines
 */
var gwtpst = gwtpst || function(){
  // shim Date.now() function
  if (!Date.now){
    Date.now = function() { return new Date().getTime(); }
  }

  if(arguments.length == 1){
    if(typeof arguments[0] === 'object'){
      var options = arguments[0];
    }
    else{
      var elementId = arguments[0];
    }
  }
  else if(arguments.length == 2){
    var elementId = arguments[0];
    var options = arguments[1];
  }

  // initialize time difference
  this.time();
  defaultOptions = {
    url : '//pst.web.local/jsonp_unix.php', // URL of the PST unix timestamp server
    refreshRate : 200 // refresh rate of pst timer
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

  if(typeof this.element == 'null'){
    throw new Error('Error! invalid elementId supplied. Element not found!');
    return false;
  }

  this.jsonpRequest();
};

gwtpst.prototype = {
  url : '',
  _started: false,
  _serverTime: 0,
  _serverTimezone: 0,
  _delay: 0,
  timers: new Array(),
  time : function(){
    return this._now = new Date().getTime();
  },
  refreshRate : 200,
  // get the time difference of the time of request to current time
  getDiff : function(){
    var localTimeZone = new Date().getTimezoneOffset();
    localTimeZone = ((localTimeZone * 60) * 1000);
    var serverTimezone = ((this._serverTimezone * 60) * 1000);
    this._serverRequestDelay = (new Date().getTime() - this._now);
    this._delay = (new Date().getTime() - (this._serverTime + this._serverRequestDelay)) - (localTimeZone - serverTimezone);
    return this._delay;
  },
  // initialize and retrieve from the pst unix timestamp server
  jsonpRequest: function(){
    var js = document.createElement('script'); js.id = 'gwt-pst-jsonp-time';
    if(typeof this._now === "undefined" ){
      this.time();
    }
    js.src = this.url+'?'+new Date().getTime(); // must be no cache

    this.element.parentNode.insertBefore(js, this.element.nextSibling);
  },
  _jsonpResponseProcess: function(func){
    if(response = func()){
      this.jsonpResponse(response);
    }
  },
  jsonpResponse: function(response){
    var scope = this;
    scope._serverTime = parseInt(response.time)*1000;
    scope._serverTimezone = response.timezone;
    scope.getDiff();

    // run the timer
    scope._started = true;
    if(typeof gwtpstReady === 'undefined'){
      console.log('Warning! no gwtpstReady() function declared to initialize timers.');
      return false;
    }
    gwtpstReady();
    scope.timer(scope);
  },
  hasStarted: function(){
    return this._started;
  },
  timer : function(gwtpst){
    var scope = gwtpst;
    var time = new Date().getTime() - scope._delay;
    var serverTime = new Date(time).format();

    // update each timer
    for (var i = 0; i < scope.timers.length; i++) {
      timer = scope.timers[i];
      timer.refresh(serverTime);
    }
    setTimeout(function(){
      scope.timer(scope)
    }, scope.refreshRate);
  },
  /**
   * register the time widget to pst object
   * @param time
   */
  register: function(time){
    // TODO: add validation if same objects are being added on queue
    this.timers.push(time);
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
    if(typeof b === 'undefined'){
      return this;
    }
    for(var attr in b){ this[attr] = b[attr]; }
    return this;
  }
};

/**
 * function that creates multiple arguments
 */
var gwtpstTime = gwtpstTime || function(){
  var gwtpst = gwtPstWidget;
  if(!gwtpst.hasStarted()){
    throw new Error('Error! gwtpst did not initialized!');
    return false;
  }

  if(arguments.length == 1){
    if(typeof arguments[0] === 'object'){
      var options = arguments[0];
    }
    else{
      var elementId = arguments[0];
    }
  }
  else if(arguments.length == 2){
    var elementId = arguments[0];
    var options = arguments[1];
  }

  defaultOptions = {
    elementId: elementId, // elementId of the time widget
    timerClass: 'pst-timer', // timerCLass of the time widget, use this for multiple selection of timers
    format: 'dddd, mmmm dd, yyyy, h:MM:ss TT', // will display "Monday, February 16, 2016 10:30:23 AM" format
    prefix: '', // prefix text before time display
    suffix: '', // suffix text after time displa
    displaySource: true, // set to true to display the source is from official PST link
    keyboardTrap: true, // set to true to display time enclosed in anchor tag to avoid keyboard trap issue!
  };
  this.extend(defaultOptions, options);

  // override other pst object
  this.gwtpst = gwtpst;

  if(typeof this._element === 'undefined'){
    if(typeof this.options.elementId === 'string'){
      this._element = document.getElementById(this.options.elementId);
      if(this._element == null){
        throw new Error('Element not found! Element with ID of "' + this.options.elementId + '"" was not found.');
        return false;
      }
      this.prepare();
      return this;
    }
    if(typeof this.options.timerClass === 'string'){
      this._elements = document.getElementsByClassName(this.options.timerClass);
      if(this._elements.length == 1){
        this._element = this._elements[0];
        this.prepare();
        return this;
      }
      if(this._elements.length == 0){
        throw new Error('Element class not found! Elements with class of "' + this.timerCLass + '"" was not found.');
        return false;
      }

      // if multiple elements are registered scan all then reinitialize timer for each then register each object created
      for (var i = 0; i < this._elements.length; i++) {
        // TODO: merge options
        var singleOptions = this.options;
        // unset the timerClass to prevent from endless looping
        singleOptions.timerClass = undefined;
        singleOptions.elementId = undefined;
        timer = new gwtpstTime(singleOptions);
        timer._element = this._elements[i];
        timer.prepare();
      }
      return this;
    }
  }
}

gwtpstTime.prototype = {
  refresh: function(time){
    this._element.innerHTML = this.options.prefix + dateFormat(time, this.options.format) + this.options.suffix;
  },
  // TODO: add event listeners
  /**
   * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
   * @param obj1
   * @param obj2
   * @returns obj3 a new object based on obj1 and obj2
   */
  extend : function(a,b){
    // var c = {};
    this.options = {};
    for(var attr in a){
      this.options[attr] = a[attr];
    }
    if(typeof b === 'undefined'){
      return this;
    }
    for(var attr in b){ this.options[attr] = b[attr]; }
    return this;
  },
  /**
   * prepares the timer before registering in pst object
   */
  prepare: function(){
    // if keyboardTrap is set to true, enclose the object in anchor tag,
    // and set the anchor tag as the new element
    if(this.options.keyboardTrap == true){
      var a = document.createElement('a');
      a.setAttribute('href','#');
      a.addEventListener('click', function(e){
        e.preventDefault();
        return false;
      }, false);
      a.style.textDecoration = "none";
      a.style.setProperty("color", "inherit", "important");
      this._element.appendChild(a);
      this._element = a;
    }

    this.gwtpst.register(this);
  }
}

/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function () {
  var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
    timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
    timezoneClip = /[^-+\dA-Z]/g,
    pad = function (val, len) {
      val = String(val);
      len = len || 2;
      while (val.length < len) val = "0" + val;
      return val;
    };

  // Regexes and supporting functions are cached through closure
  return function (date, mask, utc) {
    var dF = dateFormat;

    // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
    if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
      mask = date;
      date = undefined;
    }

    // Passing date through Date applies Date.parse, if necessary
    date = date ? new Date(date) : new Date;
    if (isNaN(date)) throw SyntaxError("invalid date");

    mask = String(dF.masks[mask] || mask || dF.masks["default"]);

    // Allow setting the utc argument via the mask
    if (mask.slice(0, 4) == "UTC:") {
      mask = mask.slice(4);
      utc = true;
    }

    var _ = utc ? "getUTC" : "get",
      d = date[_ + "Date"](),
      D = date[_ + "Day"](),
      m = date[_ + "Month"](),
      y = date[_ + "FullYear"](),
      H = date[_ + "Hours"](),
      M = date[_ + "Minutes"](),
      s = date[_ + "Seconds"](),
      L = date[_ + "Milliseconds"](),
      o = utc ? 0 : date.getTimezoneOffset(),
      flags = {
        d:    d,
        dd:   pad(d),
        ddd:  dF.i18n.dayNames[D],
        dddd: dF.i18n.dayNames[D + 7],
        m:    m + 1,
        mm:   pad(m + 1),
        mmm:  dF.i18n.monthNames[m],
        mmmm: dF.i18n.monthNames[m + 12],
        yy:   String(y).slice(2),
        yyyy: y,
        h:    H % 12 || 12,
        hh:   pad(H % 12 || 12),
        H:    H,
        HH:   pad(H),
        M:    M,
        MM:   pad(M),
        s:    s,
        ss:   pad(s),
        l:    pad(L, 3),
        L:    pad(L > 99 ? Math.round(L / 10) : L),
        t:    H < 12 ? "a"  : "p",
        tt:   H < 12 ? "am" : "pm",
        T:    H < 12 ? "A"  : "P",
        TT:   H < 12 ? "AM" : "PM",
        Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
        o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
        S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
      };

    return mask.replace(token, function ($0) {
      return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
    });
  };
}();

// Some common format strings
dateFormat.masks = {
  default: "dddd, mmmm dd, yyyy h:MM:ss TT",
  shortDate: "m/d/yy",
  mediumDate: "mmm d, yyyy",
  longDate: "mmmm d, yyyy",
  fullDate: "dddd, mmmm d, yyyy",
  shortTime: "h:MM TT",
  mediumTime: "h:MM:ss TT",
  longTime: "h:MM:ss TT Z",
  isoDate: "yyyy-mm-dd",
  isoTime: "HH:MM:ss",
  isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
  isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
  dayNames: [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ],
  monthNames: [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
  return dateFormat(this, mask, utc);
};

var gwtPstWidget;
var gwtpstInit = function(){
  gwtPstWidget = new gwtpst({
    element: document.getElementById('gwt-pst'),
    url: '//pst.web.local/jsonp_unix.php'
  });
};
gwtpstInit();

if(typeof gwtpstReady == 'undefined'){
  var gwtpstReady = function(){
    firstPst = new gwtpstTime('pst-time');
  }
}
