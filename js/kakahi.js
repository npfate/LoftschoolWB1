// slider

$(function () {

  var burgerCarousel = $('.burgers-slider').owlCarousel({
      items : 1,
      loop : true
  });

  $('.burger-slider__btn_next').on('click', function(e) {
      e.preventDefault();
      burgerCarousel.trigger('next.owl.carousel');
  });

  $('.burger-slider__btn_prev').on('click', function(e) {
      e.preventDefault();
      burgerCarousel.trigger('prev.owl.carousel');
  });

});

{
  start: function () {
    $(this).css({
      display: "none"
    })
  }
}


// accordeon vertical

$(function () {
    $('.team-accordeon__trigger').on('click', function(e) {
      e.preventDefault();

      var $this = $(this),
          item = $this.closest('.team-accordeon__item'),
          container = $this.closest('.team-accordeon'),
          items = container.find('.team-accordeon__item'),
          content = item.find('.team-accordeon__content'),
          otherContent = container.find('.team-accordeon__content');

      if(!item.hasClass('active')) {
          items.removeClass('active');
          item.addClass('active');
          otherContent.slideUp();
          content.slideDown();
      } else {
          item.removeClass('active');
          content.slideUp();
      }


    });
});




// Horizontal accordeon

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
      var $this = e.target;

      if (!$this.closest('.menu-accordeon').length) {
          $('.menu-accordeon__content').animate({
            'width' : '0px'
        });

        $('.menu-accordeon__item').removeClass('active');
      }

      console.log($this);
  });

});














// new




// accordeon vertical

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

// Horizontal accordeon

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

        // activeContent.animate({
        //     'width' : '0px'
        // });

        // content.animate({
        //     'width' : '550px'
        // })

    } else {
        item.removeClass('active');
        // content.animate({
        //     'width' : '0px'
        // });
    }

  });

  $(document).on('click', function (e) {
      var $this = $(e.target);

      if (!$this.closest('.menu-accordeon').length) {
          $('.menu-accordeon__content').animate({
            'display' : 'none'
        });

        $('.menu-accordeon__item').removeClass('active');
      }

      // console.log($this);
  });

});


//inputmask

$(function () {
    $('.phone-mask').inputmask('+7 (999) 999-99-99')
});
