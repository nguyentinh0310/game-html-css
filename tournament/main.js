$(document).ready(function () {
  const slickOptions = {
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow:
      "<button type='button' class='slick-prev'>Previous</button>",
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
        breakpoint: 800,
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

  const slickTour = {
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    prevArrow:
      "<button type='button' class='slick-prev'>Previous</button>",
    nextArrow: "<button type='button' class='slick-next'>Next</button>",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  const slider = $("#slider-up-coming").slick(slickOptions);
  $("#slider-on-going").slick(slickTour);

  // if (slider.slick("slickCurrentSlide") === 0) {
  //   $(".slick-prev").attr("disabled", true);
  // }

  // slider.on("afterChange", function (event, slick, currentSlide) {
  //   if (currentSlide === 0) {
  //     $(".slick-prev").attr("disabled", true);
  //   } else {
  //     $(".slick-prev").removeAttr("disabled");
  //   }
  // });
  $("#btn-more").click(function () {
    $(".rank-prize").css("display", "block");
  })
  $("#btn-close").click(function () {
    $(".rank-prize").css("display", "none");
  })
});
