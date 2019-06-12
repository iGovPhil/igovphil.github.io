require(['config'], function(){
require([
  'jquery',
  'underscore',
  'markdown',
  'text!../templates/menu.html',
  'text!../templates/basic.html',
  'text!../README.md',
  ], function(
  $,
  _,
  markdown,
  templateMenu,
  templateBasic,
  mdownReadme
){
  $('#menu').html(templateMenu);
  // $('#content').html(templateBasic);
  // console.log(markdown);
  $('#content').html(markdown.toHTML(mdownReadme));
  $('.dynamic-menu a').click(function(e){
    e.preventDefault();
    // get the href of the a tag
    var templateName = $(this).prop('data-content');
    
  });
});
});