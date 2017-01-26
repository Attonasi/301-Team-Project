'use strict';

$('#about-us-page').on('click', function(){
  $('.about').fadeIn();
  console.log('arg');
});

$('.about').on('click', function(){
  $('.about').fadeOut();
})
