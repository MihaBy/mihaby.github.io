(function($, undefined){

  //CSS classes
  //.search__header_input
  //.search__header_label

  console.log('run out');
  let hsf = $('[data-type="header-search_form"]');
  console.log(hsf);
  let hsf_label = hsf.find('label');
  let hsf_input = hsf.find('input');
  hsf_label.on('click',function(){
   
    hsf_input.toggleClass('search__header_input',hsf_label.not(":focus"));
    hsf_label.toggleClass('search__header_label',hsf_label.not(":focus"));
    
    
   
  });
  
  hsf_input.on('blur',function(){
    console.log('blur');
    hsf_input.toggleClass('search__header_input');
    hsf_label.toggleClass('search__header_label');
  });

  //video
  /*
  $("video").click(function() {
    //console.log(this); 
    if (this.paused) {
      this.play();
    } else {
      this.pause();
    }
  });*/
  //services data
  let servivesData  = null;
  let serv_slider_root_path_arows = './static/img/svg';
  let serv_slider_src_left_arow = 'sprite.svg#slick__left-arrow_svg';
  let serv_slider_src_right_arow = 'sprite.svg#slick__right-arrow_svg';
 
  let jsonUrl = './src/json/data.json';
  $.ajax({
    url: jsonUrl,
    dataType: "json",
    success: function (data) {
      console.log('json works');

      let services_slider = $('[data-skick="services"]'); 
      let modalServices_slider = $('[data-skick="services--modal"]'); 
      let services_sliderEl = services_slider.children();
      let modalServices_sliderEl = modalServices_slider.children();
    
    
       //slick slider
      
          //CSS classes
            //body.no-scroll
            //.modal--show 
     
      let slideCount = services_slider.find('.services__slider__el').length;
      let modalSlideCount = modalServices_slider.find('.modal-services__slider__el').length;
      console.log(slideCount + ' slideCount');
      let services_slider_el_collection = services_slider.find('.services__slider__el');
      servivesData = data;
      console.log(servivesData);
      services_sliderEl.each(function( index ) {
        $( this ).attr( "data-skick-el", index );
        $( this ).find('h4').text(servivesData.servivesElements[index]['h4']);
        $( this ).find('p').text(servivesData.servivesElements[index]['p']);
      });
      modalServices_sliderEl.each(function( index ) {
        $( this ).attr( "data-skick-el", index );
        $( this ).find('h3').text(servivesData.servivesElements[index]['h4']);

        //
        let count = 0;
        for(let key in servivesData.servivesElements[index]['modalText']) {
          // give a length of 'p' el in modalText
          if(servivesData.servivesElements[index]['modalText'].hasOwnProperty(key)) {
            count++;
          }
        }

        let modalServices_content = $( this ).find('div');
        for (let i=0; i<count; i++) {
          let $textElement = $('<p>');
          $textElement.text(servivesData.servivesElements[index]['modalText'][i]);
          modalServices_content.append($textElement);
        }
      });


      if (slideCount <= 3) {
        // clone element
        services_slider.children().clone(true, true).appendTo('[data-skick="services"]');
      }
      if (modalSlideCount <= 3) {
        // clone element
        modalServices_slider.children().clone(true, true).appendTo('[data-skick="services--modal"]');
      }

      services_slider.slick({
        dots:false,
        arrows: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        centerMode: true,
        centerPadding: '0',
        focusOnSelect: true,
        asNavFor: modalServices_slider,
        touchMove:false,
      // swipeToSlide: true,
        prevArrow: '<button type="button" class="slick-prev">Previous<svg><use xlink:href="'+ serv_slider_root_path_arows +'/'+ serv_slider_src_left_arow +'"></use></svg></button>',
        nextArrow: '<button type="button" class="slick-next">Next<svg><use xlink:href="'+ serv_slider_root_path_arows +'/'+ serv_slider_src_right_arow +'"></use></svg></button>',
        responsive: [
          {
            breakpoint: 1366,
            settings: {
              dots:false,
              arrows: true,
              centerPadding: '0',
              focusOnSelect: true,
              slidesToShow: 1,
            }
          },
        ]


      });
      modalServices_slider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: services_slider,
        dots:false,
        centerMode: true,
        infinite: true,
        centerPadding: '0',
        swipeToSlide: true,
        prevArrow: '<button type="button" class="slick-prev">Previous<svg><use xlink:href="'+ serv_slider_root_path_arows +'/'+ serv_slider_src_left_arow +'"></use></svg></button>',
        nextArrow: '<button type="button" class="slick-next">Next<svg><use xlink:href="'+ serv_slider_root_path_arows +'/'+ serv_slider_src_right_arow +'"></use></svg></button>',
        //focusOnSelect: true
      });

      services_slider.find('.services__slider__el').each(function( index ) {
          $(this).on('click', function(event) {
            var currentSlide = services_slider.slick('slickCurrentSlide');
            console.log(currentSlide);
            console.log('currentSlide');
            event.stopPropagation();
            console.log($(this));
            $this = $(this);
            setTimeout(function() {
              if ($this.hasClass( "slick-current" )) {
                console.log($this);
                showModal(
                  modalServises.modalId,
                  modalServises.modalClass,
                  modalServises.body,
                  modalServises.bodyNoScrollClass);
                $(modalServices_slider).slick('setPosition');
                }
            },200);
            });
        });

        services_slider.on('swipe', function(event, slick, direction){
          event.stopPropagation();
        });

        $(modalServises.modalId).on('click',function(event){
          hideModal(
            modalServises.modalId,
            modalServises.modalClass,
            modalServises.body,
            modalServises.bodyNoScrollClass
          );

        });
        $('[data-close-modal="close"]').on('click',function(event){
          hideModal(
            modalServises.modalId,
            modalServises.modalClass,
            modalServises.body,
            modalServises.bodyNoScrollClass
          );
        });

        $(' .modal__dialog').on('click',function(event){
          event.stopPropagation();
        });

        $('.cleaning__wrapper').children().each(function( index ) {
          $(this).on('click', function(event) {
            let getSlideIdLink = $(this).attr('data-skick-el');
            services_slider.slick('slickGoTo', Number(getSlideIdLink));
          });
        });

      }//
    });

    // modal show services
    const modalServises = {
      modalId : '#modal-services',
      modalClass : 'modal--show',
      body : 'body',
      bodyNoScrollClass : 'no-scroll',
    }

    function showModal(modalEl,modallAddClass,body,bodyClass) {
      $(body).addClass(bodyClass);
      $(modalEl).addClass(modallAddClass);
    }

    function hideModal(modalEl,modallremoveClass,body,bodyClass) {
      $(body).hasClass(bodyClass) ? $(body).removeClass(bodyClass) : false; 
      $(modalEl).hasClass(modallremoveClass) ? $(modalEl).removeClass(modallremoveClass) : false;
    }

    // modal show video
    const modalvideo = {
      modalId : '#modal-video',
      modalClass : 'modal--show',
      body : 'body',
      bodyNoScrollClass : 'no-scroll',
    }
    $('.video-section').find('[data-modal="modal-video"] ').on('click',function(event){
      showModal(
        modalvideo.modalId,
        modalvideo.modalClass,
        modalvideo.body,
        modalvideo.bodyNoScrollClass
      );
    });
    //hide modal video

 
    $(modalvideo.modalId).on('click',function(event){
      hideModal(
        modalvideo.modalId,
        modalvideo.modalClass,
        modalvideo.body,
        modalvideo.bodyNoScrollClass
      );
      });
    $('[data-close-modal="close"]').on('click',function(event){
        hideModal(
          modalvideo.modalId,
          modalvideo.modalClass,
          modalvideo.body,
          modalvideo.bodyNoScrollClass
        );
      });
  
    let jsonReviewsUrl = './src/json/reviews.json';
    let reviews_slider = null;
  $.ajax({
    url:  jsonReviewsUrl ,
    dataType: "json",
    success: function (data) {
      console.log('json reviews works')
      reviews_slider = data;

      let reviews_sliderId = $(reviews_slider.sliderId);

        
        for(let key in reviews_slider.sliderContent) {
    
          let reviewsEl =$('<div>').attr({'class': reviews_slider.sliderElClass});
          reviewsEl.append( reviews_slider.prevArrow);
          reviewsEl.append( reviews_slider.nextArrow);
          let reviewsImg =$('<img>').attr({'src':reviews_slider.sliderContent[key].src});
          let reviewsText = null;
          let reviewsAutor = null;
          for(let key in reviews_slider.sliderElContenClass) {
            if (key == 0) {
              reviewsText =$('<p>').attr({'class':reviews_slider.sliderElContenClass[key]});
            }
            if (key == 1) {
              reviewsAutor =$('<p>').attr({'class':reviews_slider.sliderElContenClass[key]});
            }
          }
          reviewsText.text(reviews_slider.sliderContent[key].text);
          reviewsAutor.text(reviews_slider.sliderContent[key].autor);

          for(let key in reviews_slider.sliderElSubClass) {
            let reviewsSubEl =$('<div>').attr({'class': reviews_slider.sliderElSubClass[key]});
            
            if (key == 0) {
              reviewsSubEl.append(reviewsImg);
            }
            if (key == 1) {
              reviewsSubEl.append(reviewsText);
              reviewsSubEl.append(reviewsAutor);

            }

            reviewsEl.append(reviewsSubEl);
          }
          reviews_sliderId.append(reviewsEl);
        }
        reviews_sliderId.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows:false,
          dots:false,
          centerMode: true,
          infinite: true,
          centerPadding: '0',
          swipeToSlide: true,
        });
        $(reviews_sliderId).find('.reviews-prev').on('click', function(event){
          event.preventDefault();
          reviews_sliderId.slick('slickPrev');
        });
        $(reviews_sliderId).find('.reviews-next').on('click', function(event){
          event.preventDefault();
          reviews_sliderId.slick('slickNext');
        });

      }//
  });
    //adaptive
     /*---------select elements and scroll------------*/

     $("[data-scroll]").on("click", function (event) {
      // cancell standart events on click
      event.preventDefault();

      let elementId = $(this).data("scroll");
      let offsetId = $(elementId).offset().top;
      burgerActivity();
      //nav.removeClass('nav_active');
      $("html, body").animate({
          scrollTop: offsetId 
      }, 500);

  });

   //burger

    let burgerBtn =  $('#burger-btn');
    let headerWraper =  $(' .header__wrapper ');
    let headerNav =  $('.header__inner ').find('nav');
    let headerNavSearch =$('.header__inner ').find('.search__form');

   let burgerActivity = function () {
    
    burgerBtn.hasClass('burger--active') ? burgerBtn.toggleClass('burger--active') : false;
    headerNav.hasClass('burger__navigation') ? headerNav.toggleClass('burger__navigation') : false;
    headerNavSearch.hasClass('search__form--active') ? headerNavSearch.toggleClass('search__form--active') : false;
    $('#intro ').hasClass('intro--css-filter') ? $('#intro ').toggleClass('intro--css-filter')  : false;
    headerWraper.hasClass('header__inner--active') ? headerWraper.toggleClass('header__inner--active')  : false;
    return false
   };
    $('#burger-btn').on('click',function(event) {
      event.preventDefault();
      $(this).toggleClass('burger--active');
      headerNav.toggleClass('burger__navigation');
      headerNavSearch.toggleClass('search__form--active');
      $('#intro ').toggleClass('intro--css-filter');
      headerWraper.toggleClass('header__inner--active');
    });

    $('#intro ').on('click',function(event) {
      burgerActivity();
      //event.stopPropagation();
     });

  })(jQuery);

  