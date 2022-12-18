$(document).ready(() => {

  // accordion
  $('.FAQ_wrapper .FAQ_item:first').addClass('active');
  $('.FAQ_wrapper .answer:not(:first)').hide();
  $('.FAQ_wrapper .question').click(function() {
      $(this).parent().toggleClass('active');
      $(this).next('.answer').slideToggle('slow');
      $(this).parent().siblings().children('.answer:visible').slideUp('slow');
      $(this).parent().siblings().removeClass('active');
  });
  
});