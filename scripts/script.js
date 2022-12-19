$(document).ready(() => {

  //menu

  const menuBtns = $('.menu_add_btn');
  const menus = $('.menu_add');
  let focusedMenu = null;

  for (let i = 0; i < menus.length; i++) {
    menuBtns.eq(i).click(function(e) {
      menus.eq(i).toggleClass('menu_add_open');
      focusedMenu = menus.eq(i);
      menuBtns.eq(i).attr('disabled', true);
    });
  }

  $(window).mouseup(function(e) {
    if (focusedMenu != null && !focusedMenu.is(e.target) && focusedMenu.has(e.target).length === 0) {
      focusedMenu.toggleClass('menu_add_open');
      focusedMenu = null;
      menuBtns.attr('disabled', false);
    }
  });

  $('.header_menu_sign').click(function() {
    $('.header_add_mob').toggleClass('header_add_mob_open');
  });

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
  isAnimating = false;

  $('.review_nav_all').html(digit(reviewLength));

  $('.review_nav_prev_btn').click(function() {
    if (!isAnimating) {
      isAnimating = true;
      reviews.eq(currentReview).fadeOut(200, function() {
          currentReview--;
          if (currentReview < 0) {
            currentReview = reviewLength - 1;
          }
          $('.review_nav_current').html(digit(currentReview + 1));
          reviews.eq(currentReview).fadeIn();
          isAnimating = false;
      });
    }
  }); 

  $('.review_nav_next_btn').click(function() {
    if (!isAnimating) {
      isAnimating = true;
      reviews.eq(currentReview).fadeOut(200, function() {
        currentReview++;
        if (currentReview >= reviewLength) {
          currentReview = 0;
        }
        $('.review_nav_current').html(digit(currentReview + 1));
        reviews.eq(currentReview).fadeIn();
        isAnimating = false;
      });
    }
  });

  function digit(number) {
    return (number < 10 ? '0' : '') + number;
  }


  // partners scroll
  const partners1 =  $('.partners .partners_wrapper').eq(0);
  const partners2 =  $('.partners .partners_wrapper').eq(1);

  partners1[0].scrollLeft = 100;
  partners2[0].scrollLeft = 200;

  let scroll1 = {
    start: 0,
    scroll: 0,
    isDown: false
  };

  let scroll2 = {
    start: 0,
    scroll: 0,
    isDown: false
  };

  partners1.mousedown(function(e) {
    scroll1.isDown = true;
    scroll1.start = e.pageX - partners1[0].offsetLeft;
    scroll1.scroll = partners1[0].scrollLeft;
  });
  partners1.mouseup(function() {
    scroll1.isDown = false;
  });
  partners1.mouseleave(function() {
    scroll1.isDown = false;
  });
  partners1.mousemove(function(e) {
    if(scroll1.isDown){
      e.preventDefault();
      const x = e.pageX - partners1[0].offsetLeft;
      const walkX = x - scroll1.start;
      partners1[0].scrollLeft = scroll1.scroll - walkX;
    }
  });

  partners2.mousedown(function(e) {
    scroll2.isDown = true;
    scroll2.start = e.pageX - partners2[0].offsetLeft;
    scroll2.scroll = partners2[0].scrollLeft;
  });
  partners2.mouseup(function() {
    scroll2.isDown = false;
  });
  partners2.mouseleave(function() {
    scroll2.isDown = false;
  });
  partners2.mousemove(function(e) {
    if(scroll2.isDown){
      e.preventDefault();
      const x = e.pageX - partners2[0].offsetLeft;
      const walkX = x - scroll2.start;
      partners2[0].scrollLeft = scroll2.scroll - walkX;
    }
  });


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