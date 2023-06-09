$('.activities__carousel').slick({
  arrows: false,
  dots: false,
  centerMode: false,
  infinite: true,
  centerPadding: '140px',
  slidesToShow: 3, // increase on larger screens to ensure start with items all across
  slidesToScroll: 3,
  variableWidth: true,
  swipeToSlide: true,
  touchThreshold: 60,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '140px',
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
      }
    }
  ]
});