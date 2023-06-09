$('.activities__carousel').slick({
  arrows: false,
  dots: false,
  centerMode: false,
  infinite: true,
  centerPadding: '140px',
  slidesToShow: 3, // increase on larger screens to ensure start with items all across
  slidesToScroll: 3,
  variableWidth: true,
  swipeToSlide: false,
  touchThreshold: 60,
  responsive: [
    { // all prev settings outside responsive apply to all responsive settings unless overwrite
      // breakpoint is a max-width, not min-width
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '140px',
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipeToSlide: true,
      }
    },
    {
      breakpoint: 1023,
      settings: {
        slidesToScroll: 2,
      }
    }
  ]
});