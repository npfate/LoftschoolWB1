// onepagescroll

$(function () {

  var sections = $('.section'),
      display = $('.maincontent'),
      inScroll = false;

  var scrollToSection = function (sectionEq) {
      var position = 0;

      if(!inScroll) {

        inScroll = true;

        position = (sections.eq(sectionEq).index() * -100) + '%';

        sections.eq(sectionEq).addClass('active')
            .siblings().removeClass('active');

        display.css({
          'transform' : 'translate3d(0, ' + position + ', 0)'
        });

        setTimeout(function() {
          inScroll = false;

          $('.fixed-menu__item').eq(sectionEq).addClass('active')
              .siblings().removeClass('active');

        }, 1300)
      }
  }

  $('.wrapper').on('wheel', function(e) {
    var deltaY = e.originalEvent.deltaY,
        activeSection = sections.filter('.active'),
        nextSection = activeSection.next(),
        prevSection = activeSection.prev();


    if (deltaY > 0) { // scrolldown
        if (nextSection.length) {
            scrollToSection(nextSection.index());
        }
    }

    if (deltaY < 0) { // scrollup
        if (prevSection.length) {
          scrollToSection(prevSection.index());
        }
    }

  });

  $('.nextpage-arrow').on('click', function(e){
      e.preventDefault();

      scrollToSection(1);
  })

  $('.fixed-menu__link, .nav__link, .order-link, .burgers-slider__buy').on('click', function(e) {
      e.preventDefault();

      var href = parseInt($(this).attr('href'));

      scrollToSection(href);


  });

  $(document).on('keydown', function(e) {
      var activeSection = sections.filter('.active'),
          nextSection = activeSection.next(),
          prevSection = activeSection.prev();

      switch (e.keyCode) {
        case 40 : // scrolldown
          if (nextSection.length) {
              scrollToSection(nextSection.index());
          }
          break;

        case 38 : // scrollup
          if (prevSection.length) {
              scrollToSection(prevSection.index());
          }
          break;
      }
  });

});

// slider

$(function () {

  var burgerCarousel = $('.burgers-slider').owlCarousel({
      items : 1,
      loop : true
  });

  $('.burgers-slider__btn_next').on('click', function(e) {
      e.preventDefault();
      burgerCarousel.trigger('next.owl.carousel');
  });

  $('.burgers-slider__btn_prev').on('click', function(e) {
      e.preventDefault();
      burgerCarousel.trigger('prev.owl.carousel');
  });

});



// Vertical Accordeon

$(function () {
    $('.team-acco__trigger').on('click', function(e) {
      e.preventDefault();

      var $this = $(this),
          item = $this.closest('.team-acco__item'),
          container = $this.closest('.team-acco'),
          items = container.find('.team-acco__item'),
          content = item.find('.team-acco__content'),
          otherContent = container.find('.team-acco__content');

      if(!item.hasClass('active')) {
          items.removeClass('active');
          otherContent.slideUp();
          item.addClass('active');
          content.slideDown();
      } else {
          item.removeClass('active');
          content.slideUp();
      }


    });
});

// Horizontal Accordeon

$(function () {
  $('.menu-accordeon__trigger').on('click', function(e) {
    e.preventDefault();

    var $this = $(this),
        container = $this.closest('.menu-accordeon'),
        item = $this.closest('.menu-accordeon__item'),
        items = container.find('.menu-accordeon__item'),
        activeItem = items.filter('.active'),
        content = item.find('.menu-accordeon__content'),
        activeContent = activeItem.find('.menu-accordeon__content');

    if (!item.hasClass('active')) {

        items.removeClass('active');
        item.addClass('active');

        activeContent.animate({
            'width' : '0px'
        });

        content.animate({
            'width' : '550px'
        })

    } else {
        item.removeClass('active');
        content.animate({
            'width' : '0px'
        });
    }

  });

  $(document).on('click', function (e) {
      var $this = $(e.target);

      if (!$this.closest('.menu-accordeon').length) {
          $('.menu-accordeon__content').animate({
            'width' : '0px'
        });

        $('.menu-accordeon__item').removeClass('active');
      }

  });

});

//inputmask

$(function () {
    $('.phone-mask').inputmask('+7 (999) 999-99-99')
});

//fancybox
$(function () {
  $('.review__button-link').fancybox({
    type  : 'inline',
    maxWidth : 460,
    maxHeight : 250,
		fitToView	: false,
    padding: 0,
		autoSize	: false,
    touch : true,
    closeBtn : false,
    closeClickOutside : true,
    helpers : {
      overlay : {
        css : {
          'background' : 'rgba(47, 50, 52, 0.92)'
        }
      }
    }
  });

  $('.full-review__close').on('click', function (e) {
      e.preventDefault();

      $.fancybox.close();

  });
});

// form submit
$(function () {
  $('#order-form').on('submit', function (e) {
    e.preventDefault();

      var
          form = $(this),
          formData = form.serialize();

      $.ajax({
        url: 'mail.php',
        type: 'POST',
        data: formData,
        success: function (data) {

          var popup = data.status ? '#success' : '#error';

          $.fancybox.open([
            {href : popup}
          ], {
            type: 'inline',
            maxWidth: 250,
            fitToView: false,
            padding: 0,
            helpers : {
              overlay : {
                css : {
                  'background' : 'rgba(47, 50, 52, 0.92)'
                }
              }
            },
            afterClose : function () {
              form.trigger('reset');
            }
          });
        }
      });

      $('.status-popup__close').on('click', function (e) {
        e.preventDefault();
        $.fancybox.close();
      });
  });
});



// yandex.map
ymaps.ready(init);
    var myMap,
    myPlacemark1,
    myPlacemark2,
    myPlacemark3;


    function init(){
        myMap = new ymaps.Map("map", {
            center: [59.85767521, 30.32155707],
            zoom: 14
        });

        myMap.controls
          .remove('geolocationControl')
          .remove('trafficControl')
          .remove('rulerControl')
          .remove('searchControl');

        myMap.behaviors.disable([
          'scrollZoom',
          'drag'
        ]);

        myPin = new ymaps.GeoObjectCollection({}, {
          iconLayout: 'default#image',
          iconImageHref: 'img/icons/map-marker.svg',
          iconImageSize: [60, 64],
          iconImageOffset: [-30, -60],
          draggable: false // и их можно перемещать
        });

        myPlacemark1 = new ymaps.Placemark([59.85963953, 30.31347825], {
          balloonContentHeader: 'BURGERS1',
          balloonContentBody: 'Черный бургер_1',
          balloonContentFooter: 'Всем так очень нравится',
          hintContent: 'Burgeri_'
        });

        myPlacemark2 = new ymaps.Placemark([59.85575622, 30.31640801], {
          balloonContentHeader: 'BURGERS2',
          balloonContentBody: 'Черный бургер_2',
          balloonContentFooter: 'Всем так очень нравится',
          hintContent: 'Burgeri_2'
        });

        myPlacemark3 = new ymaps.Placemark([59.85754796, 30.32775912], {
          balloonContentHeader: 'BURGERS3',
          balloonContentBody: 'Черный бургер_3',
          balloonContentFooter: 'Всем так очень нравится',
          hintContent: 'Burgeri_3'
        });

         myPin.add(myPlacemark1).add(myPlacemark2).add(myPlacemark3);
         myMap.geoObjects.add(myPin);
        //  myMap.geoObjects.add(myPlacemark1);
        //  myMap.geoObjects.add(myPlacemark2);
        //  myMap.geoObjects.add(myPlacemark3);

    }
