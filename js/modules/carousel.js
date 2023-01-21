
// carousel for reviews

function carousel() {
  const reviews = $('.review .review_content');
  let currentReview = 0;
  let reviewLength = reviews.length;
  reviews.hide();
  reviews.eq(currentReview).show();
  let isAnimating = false;
  
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
}

export default carousel;