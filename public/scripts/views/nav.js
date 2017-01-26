'use strict';

$('#about-us-page').on('click', function(){
  $('.state-data').hide();
  $('aside').hide();
  $('.about').fadeIn();
  console.log('arg');
});

$('.about').on('click', function(){
  $('.about').fadeOut();
  $('.state-data').fadeIn();
  $('aside').show();
})
