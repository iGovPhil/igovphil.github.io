require(['config'], function(){
require([
  'jquery',
  'underscore',
  'markdown',
  'text!../README.md',
  ], function(
  $,
  _,
  markdown,
  mdownReadme
){
  $('#content').html(markdown.toHTML(mdownReadme));

});
});