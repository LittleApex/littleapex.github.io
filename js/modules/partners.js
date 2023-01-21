function partners() {
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
}

export default partners;