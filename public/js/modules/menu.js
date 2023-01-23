function menu() {

  // desktop
  const menuBtns = $('.menu_add_btn');
  const menus = $('.menu_add');
  const headers = $('[id=dropdown]');

  let focusedMenu = null;
  let openedStatic = null;

  for (let i = 0; i < menus.length; i++) {
    menuBtns.eq(i).click(function(e) {
      menus.eq(i).toggleClass('menu_add_open');
      focusedMenu = menus.eq(i);
      openedStatic = true;
      menuBtns.eq(i).attr('disabled', true);
    });

    menus.eq(i).mouseleave(function(e) {
      if (!openedStatic) {
        focusedMenu?.toggleClass('menu_add_open');
        focusedMenu = null;
        menuBtns.attr('disabled', false);
        openedStatic = null;
      }
    });
  }

  for (let i = 0; i < headers.length; i++) {
    headers.eq(i).mouseover(function(e) {
      closeFocused(e);
      menus.eq(i).toggleClass('menu_add_open');
      openedStatic = false;
      focusedMenu = menus.eq(i);
      menuBtns.eq(i).attr('disabled', true);
    });
  }

  $(window).mouseup(function(e) {
    closeFocused(e);
  });


  function closeFocused(e) {
    if (focusedMenu != null && !focusedMenu.is(e.target) && focusedMenu.has(e.target).length === 0) {
      focusedMenu.toggleClass('menu_add_open');
      focusedMenu = null;
      menuBtns.attr('disabled', false);
    }
  }
  
  //mobile
  $('.header_add_mob').hide();
  $('.header_menu_sign').click(function() {
    $('.header_add_mob').slideToggle('slow');
  });

  //menu links
  $(document).ready(function () {
    $('.header_menu a').click(function () {
        $('.header_menu a').removeClass("current");
        $(this).addClass('current');
    });
});

}


export default menu;