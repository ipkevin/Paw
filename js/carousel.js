$('.activities__carousel').slick({
  arrows: false,
  dots: true,
  centerMode: false,
  infinite: true,
  centerPadding: '140px',
  slidesToShow: 3, // increase on larger screens to ensure start with items all across
  variableWidth: true,
  swipeToSlide: true,
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