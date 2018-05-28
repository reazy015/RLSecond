'use strict';

window.sliderPopup = (function (){
  var sliderPopupWrapper = document.querySelector('.slider-popup-wrapper');
  var sliderPopupSlide = sliderPopupWrapper.querySelector('.slider-popup-slide');
  var zoomImg = document.querySelectorAll('.img-zoom');
  var slidesWrappersList = document.querySelectorAll('.order-panel-slider');

  function closeOnOuterClick(evt) {
    var target = evt.target;
    if (!target.classList.contains('slider-popup-slider') && sliderPopupWrapper.classList.contains('slider-popup-wrapper--active')) {
      sliderPopupWrapper.classList.remove('slider-popup-wrapper--active');
      document.removeEventListener('click', closeOnOuterClick);
      document.body.classList.remove('no-scroll');
    }
  }

  function openAppropriateImg() {
    sliderPopupWrapper.classList.toggle('slider-popup-wrapper--active');
    sliderPopupSlide.style.backgroundImage = 'url(' + document.querySelector('.order-panel-slider--active').querySelector('.swiper-slide-active').dataset.imgurl + ')';
  }

  for (var i = 0; i < zoomImg.length; i++) {
    zoomImg[i].addEventListener('click', function(evt){
      evt.stopPropagation();
      document.addEventListener('click', closeOnOuterClick);
      document.body.classList.add('no-scroll');
      openAppropriateImg();
    });
  }

  document.addEventListener('keyup', function(evt) {
    if (evt.keyCode === 27) {
      sliderPopupWrapper.classList.remove('slider-popup-wrapper--active');
    }
  })

})();