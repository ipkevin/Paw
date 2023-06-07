$('.review-carousel').slick({
  arrows: false,
  centerMode: true,
  infinite: false,
  centerPadding: '140px',
  slidesToShow: 1,
  initialSlide: 1,
  variableWidth: true,
});

$('.testimonies-carousel').slick({
  dots: true,
  arrows: false,
  infinite: false,
  slidesToShow: 1,
  adaptiveHeight: true
});

$('.activities__carousel').slick({
  arrows: false,
  centerMode: true,
  infinite: true,
  centerPadding: '140px',
  slidesToShow: 3, // increase on larger screens to ensure start with items all across
  variableWidth: true,
  // responsive: [
  //   {
  //     breakpoint: 768,
  //     settings: {
  //       arrows: false,
  //       centerMode: true,
  //       centerPadding: '140px',
  //       infinite: true,
  //       slidesToShow: 1,
  //       variableWidth: false,
  //     }
  //   }
  // ]
});

$('.games-carousel.games-carousel-centered').slick({
  arrows: false,
  centerMode: true,
  infinite: true,
  centerPadding: '140px',
  slidesToShow: 1,
  variableWidth: true,
});

$('.games-carousel').slick({
  arrows: false,
  centerMode: false,
  infinite: false,
  centerPadding: '140px',
  slidesToShow: 1,
  variableWidth: true,
});

$('.instagram-carousel').slick({
  arrows: false,
  centerMode: false,
  infinite: false,
  centerPadding: '140px',
  slidesToShow: 1,
  variableWidth: true,
});