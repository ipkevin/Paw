$('.activities__carousel').slick({
  arrows: false,
  centerMode: false, // causes noticeable bounce back to center on wider screens
  infinite: true,
  centerPadding: '1px',
  slidesToShow: 3, 
  slidesToScroll: 3,
  variableWidth: true,
  swipeToSlide: true, /* if enabled, swipe no longer smoothly scrolls multiple items like slidetoScroll, but tradeoff is do not see empty slide pop in either */
  touchThreshold: 30,
  responsive: [
    { // all prev settings outside responsive apply to all responsive settings unless overwrite
      // breakpoint is a max-width, not min-width
      breakpoint: 768,
      settings: {
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
        centerMode:true,
        slidesToShow: 3,
        slidesToScroll: 2,
        swipeToSlide: true,
      }
    }
  ]
});