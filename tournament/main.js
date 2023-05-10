$(document).ready(function () {
  var slickOptions = {
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow:
      "<button type='button' class='slick-prev' disabled>Previous</button>",
    nextArrow: "<button type='button' class='slick-next'>Next</button>",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  var slider = $(".slider").slick(slickOptions);

  if (slider.slick("slickCurrentSlide") === 0) {
    $(".slick-prev").attr("disabled", true);
  }

  slider.on("afterChange", function (event, slick, currentSlide) {
    if (currentSlide === 0) {
      $(".slick-prev").attr("disabled", true);
    } else {
      $(".slick-prev").removeAttr("disabled");
    }
  });
});
