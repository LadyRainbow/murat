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
    // slider partner Page Partner
    $('.general-partner-slider').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: $('.prev-part2-arrow'),
        nextArrow: $('.next-part2-arrow'),
        dots: false,
        responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: false
              }
            },
            {
              breakpoint: 768,
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
   var selectorPart = '.general-partner-slider .slick-slide:not(.slick-cloned) .fancy-link';

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
    $().fancybox({
       selector : selectorPart,
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

   // partners page
    if($('.partners-page-content .col-12').length > 9) {
       $('.show-partn-btn').addClass('active');
    };
    $('.show-partn-btn').click(function () {
        $('.partners-page-content .col-12').addClass('active');
        $(this).fadeOut();
    });
    // go back
    $('.back-arrow').click(function(){
        window.history.back();
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
    };

    // news page
     if($('.news-page-content .col-12').length > 9) {
        $('.show-news-btn').addClass('active');
     };
     $('.show-news-btn').click(function () {
         $('.news-page-content .col-12').addClass('active');
         $(this).fadeOut();
     });

     // article page
     $('.article-slider').slick({
         infinite: true,
         slidesToShow: 3,
         slidesToScroll: 1,
         prevArrow: $('.prev-article-arrow'),
         nextArrow: $('.next-article-arrow'),
         dots: false,
         responsive: [
             {
               breakpoint: 992,
               settings: {
                 slidesToShow: 2,
                 slidesToScroll: 1,
                 arrows: false
               }
             },
             {
               breakpoint: 768,
               settings: {
                 slidesToShow: 1,
                 slidesToScroll: 1,
                 arrows: false
               }
             },
         ]
     });

     // vip page
    $('.up-down').click(function () {
        if($(this).find('.up').hasClass('active')) {
            $(this).find('.up').removeClass('active');
            $(this).find('.down').addClass('active');
        } else {
            $(this).find('.down').removeClass('active');
            $(this).find('.up').addClass('active');
        }
    });

    // $('.select-simple').selectize();
    //
    // $('.vip-table tbody tr').each(function(i) {
    //     var number = i + 1;
    //     $(this).find('td:first .table-row').text("#" + number);
    // });


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

    // only number
    $(".input-number").keypress(function(event){
      event = event || window.event;
      if (event.charCode && event.charCode!=0 && event.charCode!=8 && event.charCode!=46 && (event.charCode < 48 || event.charCode > 57) )
        return false;
    });


    // masked
    $('.mask-phone').mask('+999999?9999999999', {placeholder:""});

    // contacts page
    $('.map-link li').each(function (index, value) {
        $(this).attr('data-id', '' + index + '');
    });






    // pop-ups
    function thnx () {
        $overlayPopUpWRP.addClass('active');
        $('body, html').addClass('active');
        $popUpGeneralBlock.removeClass('active');
        $('#thnx').addClass('active');
    };
    $('.open-pop-up').click(function (e) {
        $overlayPopUpWRP.addClass('active');
        $('body, html').addClass('active');
        $popUpGeneralBlock.removeClass('active');
        $('#formPopUp').addClass('active');
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

    $('.pro-tabs-btn li').click(function () {
        $('.pro-tabs-btn li').removeClass('active');
        $(this).addClass('active');
        var $idTabBody = $(this).attr('data-tab');
        $('.prog-tabs-body').removeClass('active');
        $('#' + $idTabBody + '.prog-tabs-body').addClass('active');
    });

    $('.new-prog-screen-btn').click(function () {
        var $idTabBody = $(this).closest('.new-prog-block').attr('data-tab');
        $('.pro-tabs-btn li').removeClass('active');
        $('.pro-tabs-btn li[data-tab|="'+ $idTabBody + '"]').addClass('active');
        $('.prog-tabs-body').removeClass('active');
        $('#' + $idTabBody + '.prog-tabs-body').addClass('active');

        $overlayPopUpWRP.addClass('active');
        $('body, html').addClass('active');
        $popUpGeneralBlock.removeClass('active');
        $('#progPopUp').addClass('active');
    });
});
