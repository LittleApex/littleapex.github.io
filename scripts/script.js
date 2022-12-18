$(document).ready(() => {
  // rate
  $('.rate .rate_item').mouseover(function() {
    $(this).toggleClass('rate_item_main');
  });

  $('.rate .rate_item').mouseout(function() {
    $(this).toggleClass('rate_item_main');
  });


  // reviews
  const reviews = $('.review .review_content');
  let currentReview = 0;
  let reviewLength = reviews.length;
  reviews.hide();
  reviews.eq(currentReview).show();

  $('.review_nav_all').html(digit(reviewLength));

  $('.review_nav_prev_btn').click(function() {
    reviews.eq(currentReview).fadeOut(200, function() {
        currentReview--;
        if (currentReview < 0) {
          currentReview = reviewLength - 1;
        }
        $('.review_nav_current').html(digit(currentReview + 1));
        reviews.eq(currentReview).fadeIn();
    });
  }); 

  $('.review_nav_next_btn').click(function() {
    reviews.eq(currentReview).fadeOut(200, function() {
      currentReview++;
      if (currentReview >= reviewLength) {
        currentReview = 0;
      }
      $('.review_nav_current').html(digit(currentReview + 1));
      reviews.eq(currentReview).fadeIn();
    });
  });

  function digit(number) {
    return (number < 10 ? '0' : '') + number;
  }

  // scroll position
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