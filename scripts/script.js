$(document).ready(() => {

  // scroll
  // $('.partners .partners_wrapper')[0].scrollRight(50);
  // const p = document.querySelector('.partners_wrapper');
  // p.scrollLeft = 100;

  $('.partners .partners_wrapper')[0].scrollLeft = 100;
  $('.partners .partners_wrapper')[1].scrollLeft = 200;


  // accordion
  $('.FAQ_wrapper .FAQ_item:first').addClass('active');
  $('.FAQ_wrapper .answer:not(:first)').hide();
  $('.FAQ_wrapper .question').click(function() {
      $(this).parent().toggleClass('active');
      $(this).next('.answer').slideToggle('slow');
      $(this).parent().siblings().children('.answer:visible').slideUp('slow');
      $(this).parent().siblings().removeClass('active');
  });


  // form
  $('.request_form form .request_btn').click(function(event) {
    event.preventDefault();
    if (!$('.request_form form .check').is(':checked')) {
      return;
    } 
    const formData = new FormData($('.request_form form')[0]);
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        comment: formData.get('comment'),
    }
    $.ajax({
        url: 'https://api.slapform.com/sS0wObjpmM',
        method: 'post',
        dataType: 'json',
        data: JSON.stringify(data),
        success: function(data) {
            console.log(data);
            $('.request_form form')[0].reset();
        }
    });    
  });
  
});