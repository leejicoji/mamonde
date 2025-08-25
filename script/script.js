$(function () {
  let sc = 0;
  $(window).scroll(function () {
    sc = $(window).scrollTop(); // 현재 스크롤값
    if (sc > 50) {
      $('.header_basic').css({ 'height': '70px', 'background-color': '#ffffff', 'position': 'fixed' });
      $('.logo_basic').show();
      $('.menu_wrap').css({ 'top': '20px' });
      $('.top_menu>li').css({ 'font-size': '20px' });
      $('.logo_big').hide();
      $('.right_menu').css({ 'margin-top': '-55px' });
      $('.right_menu li').css({ 'font-size': '20px' });

      $('.t_menu').css({ 'height': '70px', 'background-color': '#ffffff', 'position': 'fixed' });
      $('.t_logo').hide();
      $('.t_sclogo').show();
    } else {
      $('.header_basic').css({ 'height': '200px', 'background-color': 'transparent', 'position': 'absolute' });
      $('.logo_basic').hide();
      $('.logo_big').show();
      $('.menu_wrap').css({ 'top': '150px' });
      $('.top_menu>li').css({ 'font-size': '18px' });
      $('.right_menu').css({ 'width': '200px', 'margin-top': '30px' });
      $('.right_menu li').css({ 'font-size': '18px' });

      $('.t_menu').css({ 'height': '90px', 'background-color': 'transparent', 'position': 'absolute' });
      $('.t_logo').show();
      $('.t_sclogo').hide();
    }
  });

  // 메뉴 hover
  $('.top_menu li:nth-child(1)').mouseenter(function () {
    $('.sub_bg1').stop().slideDown();
    $('.header_basic').css({ 'background-color': '#ffffff' });
  }).mouseleave(function () {
    $('.sub_bg1').stop().slideUp();
    $('.header_basic').css({ 'background-color': 'transparent' });
  });

  $('.top_menu li:nth-child(3)').mouseenter(function () {
    $('.sub_bg2').stop().slideDown();
    $('.header_basic').css({ 'background-color': '#ffffff' });
  }).mouseleave(function () {
    $('.sub_bg2').stop().slideUp();
    $('.header_basic').css({ 'background-color': 'transparent' });
  });

  // 슬라이드 변수
  let slide_num = 0;
  let slide_num2 = 0;
  let slideInterval;

  function startAutoSlide() {
    slideInterval = setInterval(function () { moveRight(); }, 3000);
  }
  function stopAutoSlide() { clearInterval(slideInterval); }

  function moveRight() {
    slide_num -= 100; if (slide_num < -200) slide_num = 0;
    $('.slide ul').animate({ 'marginLeft': slide_num + '%' }, 500);
    slide_num2 += 33.33; if (slide_num2 > 66.66) slide_num2 = 0;
    $('.slide_bar ul li').animate({ 'left': slide_num2 + '%' }, 500);
  }

  function moveLeft() {
    slide_num += 100; if (slide_num > 0) slide_num = -200;
    $('.slide ul').animate({ 'marginLeft': slide_num + '%' }, 500);
    slide_num2 -= 33.33; if (slide_num2 < 0) slide_num2 = 66.66;
    $('.slide_bar ul li').animate({ 'left': slide_num2 + '%' }, 500);
  }

  $('.slide_left').click(function () { stopAutoSlide(); moveLeft(); });
  $('.slide_right').click(function () { stopAutoSlide(); moveRight(); });

  $('.slide_bt div:nth-child(1)').click(function () { slide_num=0; slide_num2=0; $('.slide ul').animate({'marginLeft':slide_num+'%'},500); $('.slide_bar ul li').animate({'left':slide_num2+'%'},500); });
  $('.slide_bt div:nth-child(2)').click(function () { slide_num=-100; slide_num2=33.33; $('.slide ul').animate({'marginLeft':slide_num+'%'},500); $('.slide_bar ul li').animate({'left':slide_num2+'%'},500); });
  $('.slide_bt div:nth-child(3)').click(function () { slide_num=-200; slide_num2=66.66; $('.slide ul').animate({'marginLeft':slide_num+'%'},500); $('.slide_bar ul li').animate({'left':slide_num2+'%'},500); });

  startAutoSlide();

  $(".pause_btn").click(function() { stopAutoSlide(); $(this).hide(); $(".play_btn").show(); });
  $(".play_btn").click(function() { startAutoSlide(); $(this).hide(); $(".pause_btn").show(); });

  let $videoWrap = $(".video_wrap");
  $videoWrap.css({ overflow:"hidden", transition:"clip-path 0.6s ease", clipPath:"inset(0 30% 0 30%)" });

  // ====== ani_page & ani_box 초기 세팅 ======
  const $aniPage = $(".ani_page").css({ transform:"scale(0.8)", transformOrigin:"center center", transition:"transform 0.25s linear", willChange:"transform" });
  const $aniBox = $(".ani_page .ani_box").css({ opacity:0.6, transition:"opacity 0.25s linear", willChange:"opacity" });

  // ====== 스크롤 이벤트 합체 ======
  $(window).on("scroll resize", function() {
    let windowHeight = $(window).height();
    let scrollTop = $(window).scrollTop();

    // 비디오 clipPath
    let elementTop = $videoWrap.offset().top;
    let elementHeight = $videoWrap.outerHeight();
    let elementCenter = elementTop + elementHeight/2;
    let windowCenter = scrollTop + windowHeight/2;
    let distance = Math.abs(windowCenter - elementCenter);

    if(distance < elementHeight/2) { $videoWrap.css({ clipPath:"inset(0 0% 0 0%)" }); }
    else { $videoWrap.css({ clipPath:"inset(0 30% 0 30%)" }); }

    // ani_page / ani_box 비례 애니메이션 + ani_page 100vh
    $aniPage.each(function(){
      const $page = $(this);
      const top = $page.offset().top;
      const h = $page.outerHeight();
      const pageCenter = top + h/2;
      const winCenter = scrollTop + windowHeight/2;
      const dist = Math.abs(winCenter - pageCenter);

      let ratio = 1 - (dist / (h/2));
      if(ratio < 0) ratio=0; if(ratio>1) ratio=1;

      const scaleVal = 0.8 + 0.2*ratio;  // scale 0.8~1
      const opacityVal = 0.6 + 0.4*ratio; // opacity 0.6~1

      $page.css({ transform: "scale("+scaleVal+")", height:"100vh" }); // 높이 100vh
      $page.find(".ani_box").css({ opacity: opacityVal });
    });
  });

  $(".products ul li").hover(
    function () {
      if ($(window).width() > 1024) { // PC 전용 (1025px 이상에서만 실행)
        $(this).find(".click_product, .hover_tag").stop().fadeIn();
      }
    },
    function () {
      if ($(window).width() > 1024) { // PC 전용
        $(this).find(".click_product, .hover_tag").stop().fadeOut();
      }
    }
  );

  const $cursor = $("#cursor");
  const $clickText = $("#clickText");

  // 마우스 이동 → 꽃 이미지와 Click! 위치 항상 중앙
  $(document).on("mousemove", function (e) {
    const x = e.clientX;
    const y = e.clientY;

    $cursor.css({ left: x + "px", top: y + "px" });
    $clickText.css({ left: x + "px", top: y + "px" });
  });

  // 클릭 가능한 요소 hover
  $("a, button, .clickable").hover(
    function () {
      // 점점 나타나기
      $clickText.stop(true, true).fadeTo(300, 1); // 0.3초 동안 opacity 1
    },
    function () {
      // 점점 사라지기
      $clickText.stop(true, true).fadeTo(300, 0); // 0.3초 동안 opacity 0
    }
  );
});
