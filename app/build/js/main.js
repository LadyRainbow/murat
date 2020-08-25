$ = jQuery.noConflict(true);
$(document).ready(function () {
    var $window = $(window);
    var windowHeight = $window.height();
    var windowWidth = $window.width();
    var $header = $('header');

    var $popUpGeneralBlock = $('.pop-up-general-block');

    var $overlayPopUpWRP = $('.pop-up-overlay-wrapper');
    var $overlay = $('.overlay-pop-up');
    var $closePopUpBtn = $('.pop-up-general-block-close-btn');

    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    let vhMenu = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.documentElement.style.setProperty('--vhMenu', `${vhMenu}px`);

    // We listen to the resize event
    window.addEventListener('resize', () => {
      // We execute the same script as before
      let vhMenu = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vhMenu', `${vhMenu}px`);
    });

    // scroll
    var lastScrollTop = 0;
    $(window).scroll(function(event) {
        var st = $(this).scrollTop();
        if (st > lastScrollTop) {
            $header.addClass('header-hide');
        } else if (st < lastScrollTop) {
            $header.removeClass('header-hide');
        }
        if (st < 0) {
            st = 0;
        }
        lastScrollTop = st;
    });

    function headerChange () {
        if($window.scrollTop() > 100) {
            $header.addClass('header-hide');
        } else {
            $header.removeClass('header-hide');
        }
    };
    headerChange();

    // slider
    $('.main-slider').slick({
        // autoplay: true,
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        prevArrow: $('.prev-main-arrow'),
        nextArrow: $('.next-main-arrow'),
        dots: false,
        responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                // arrows: false
              }
            },
            {
              breakpoint: 768,
              settings: {
                infinite: true,
                slidesToShow: 2,
                slidesToScroll: 1,
                // arrows: false
              }
            },
            {
              breakpoint: 765,
              settings: {
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                // arrows: false
              }
            },
        ]
    });

    // slider partner
    $('.partner-slider').slick({
        // autoplay: true,
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        prevArrow: $('.prev-part-arrow'),
        nextArrow: $('.next-part-arrow'),
        dots: false,
        responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false
              }
            },
        ]
    });

    // fancybox
   var selector = '.main-slider .slick-slide:not(.slick-cloned) .fancy-link';
   var selectorCert = '.cert__slider .slick-slide:not(.slick-cloned) .fancy-link';

   // Skip cloned elements
   $().fancybox({
       selector : selector,
       hash: false,
       backFocus : false,
   });
   $().fancybox({
       selector : selectorCert,
       hash: false,
       backFocus : false,
   });

   // form checked
    $('.checkbox-check').change(function() {
      if(this.checked) {
          $(this).closest('form').find('.btn-checkbox').removeClass('btn-checkbox-disabled');
      }
      else {
          $(this).closest('form').find('.btn-checkbox').addClass('btn-checkbox-disabled');
      }
    });

    // zaimi checkbox
    $('.discount-text').click(function () {
       $(this).addClass('active');
       if($(this).hasClass('bonus')) {
           $('.discount-text.discount').removeClass('active');
           $('.checkbox-round input').prop('checked', false);
           $('.main-prog-wrp-tab.discount').removeClass('active');
           $('.main-prog-wrp-tab.bonus').addClass('active');
       } else {
           $('.discount-text.bonus').removeClass('active');
           $('.checkbox-round input').prop('checked', true);
           $('.main-prog-wrp-tab.bonus').removeClass('active');
           $('.main-prog-wrp-tab.discount').addClass('active');
       }
   });

   $('.checkbox-round input').on('input', function () {
       if($(this).prop('checked')) {
           $('.discount-text.discount').addClass('active');
           $('.main-prog-wrp-tab.discount').addClass('active');
           $('.discount-text.bonus').removeClass('active');
           $('.main-prog-wrp-tab.bonus').removeClass('active');
       } else {
           $('.discount-text.discount').removeClass('active');
           $('.main-prog-wrp-tab.discount').removeClass('active');
           $('.discount-text.bonus').addClass('active');
           $('.main-prog-wrp-tab.bonus').addClass('active');
       }
   });

   // review page
    if($('.review-block').length > 4) {
       $('.show-rev-btn').addClass('active');
    };
    $('.show-rev-btn').click(function () {
        $('.review-block').addClass('active');
        $(this).fadeOut();
    });

    $('.ben-change-text').each(function (index, value){
        var heightText = $(this).height() + 16;
        $(this).closest('.benefits-info').css('transform', 'translateY(' + heightText + 'px)')
    });

    // docs page
    if(windowWidth > 767) {
        $('.docs-page-list li').click(function (e) {
            e.preventDefault();
            $(this).closest('.docs-page-list').find('li').removeClass('active');
            $(this).addClass('active');
            // change main docs
            var docLink = $(this).find('a').attr('href');
            var docImg = $(this).find('a').attr('data-img');
            var docTitle = $(this).find('a').text();

            $('.docs-hat h3').text(docTitle);
            $('.docs-current-img').attr('href', docImg);
            $('.docs-current-img img').attr('src', docImg);
            $('.open-icon').attr('href', docLink);
        });
    } else {
        $('.docs-page-list li').click(function () {
            $(this).closest('.docs-page-list').find('li').removeClass('active');
            $(this).addClass('active');
        });
    }



    // tabs
    // tabs change link color
    $('.tab-list li').click(function () {
        $(this).closest('.tab-list').find('li').removeClass('active');
        $(this).addClass('active');
    });
    $('.redact-address-btn').click(function () {
        var idBlockContent = $(this).attr('data-tab');
        $('.lk-address-body').removeClass('active');
        $('#' + idBlockContent + '').addClass('active');
    });

    // menu
    $('.burger').click(function () {
        $('.menu').addClass('active');
        $('body').addClass('active');
        setTimeout(function () {
            $('.menu-content').addClass('active');
            $('.btn-menu-close').addClass('active');
        }, 100);
    });
    $('.btn-menu-close').click(function () {
        $('.menu-content').removeClass('active');
        $('.btn-menu-close').removeClass('active');
        setTimeout(function () {
            $('.menu').removeClass('active');
            $('body').removeClass('active');
        }, 200);
    });
    $('.menu-overlay').click(function () {
        $('.menu-content').removeClass('active');
        setTimeout(function () {
            $('.menu').removeClass('active');
            $('body').removeClass('active');
        }, 200);
    });


    // soft scroll
    $(".scrollTo").on("click", function (event) {
        // исключаем стандартную реакцию браузера
        event.preventDefault();
        var id  = $(this).attr('href');
        var top = $(id).offset().top;
        // анимируем переход к блоку, время: 800 мс
        $('body,html').animate({scrollTop: top}, 500);
        // находим высоту, на которой расположен блок
    });






    // only number
    $(".input-number").keypress(function(event){
      event = event || window.event;
      if (event.charCode && event.charCode!=0 && event.charCode!=8 && event.charCode!=46 && (event.charCode < 48 || event.charCode > 57) )
        return false;
    });



    var flag = 0;
    $('.show-tarif').click(function () {
        $(this).closest('.card-bank').toggleClass('show');
        if (flag === 0) {
            $(this).html('Свернуть');
            $(this).addClass('show');
            flag = 1;
        } else {
            $(this).html('Еще 3 тарифа');
            $(this).removeClass('show');
            flag = 0;
        }
    });

    // masked
    $('.mask-phone').mask('+999999?9999999999', {placeholder:""});





    // pop-ups
    function thnx () {
        $overlayPopUpWRP.addClass('active');
        $('body, html').addClass('active');
        $popUpGeneralBlock.removeClass('active');
        $('#thnx').addClass('active');
    };
    $('.open-pop-up-mob').click(function (e) {
        e.preventDefault();
        $('.menu-content').removeClass('active');
        $('.btn-menu-close').removeClass('active');
        setTimeout(function () {
            $('.menu').removeClass('active');
            $('body').removeClass('active');
        }, 200);
        thnx ();
    });


    $overlay.click(function () {
        $overlayPopUpWRP.removeClass('active');
        $('body, html').removeClass('active');
        $popUpGeneralBlock.removeClass('active');
    });
    $closePopUpBtn.click(function () {
        $overlayPopUpWRP.removeClass('active');
        $('body, html').removeClass('active');
        $popUpGeneralBlock.removeClass('active');
    });
});
