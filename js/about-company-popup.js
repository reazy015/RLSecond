'use strict';

window.aboutPopup = (function (){
  var licenseItemsList = document.querySelectorAll('.license-item');
  var sliderPopupWrapper = document.querySelector('.slider-popup-wrapper');
  var sliderPopupModal = sliderPopupWrapper.querySelector('.slider-popup-slide');

  function closeOnOuterClick(evt) {
    var target = evt.target;
    if (!target.classList.contains('slider-popup-slider') && sliderPopupWrapper.classList.contains('slider-popup-wrapper--active')) {
      sliderPopupWrapper.classList.remove('slider-popup-wrapper--active');
      sliderPopupModal.classList.remove('slider-popup-slide--docs');
      while (sliderPopupModal.firstElementChild) {
        sliderPopupModal.removeChild(sliderPopupModal.firstElementChild);
      }
      document.removeEventListener('click', closeOnOuterClick);
    }
  }

  function createImg(url) {
    var img = document.createElement('img');
    img.setAttribute('src', url);
    return img;
  }

  for (var i = 0; i < licenseItemsList.length; i++) {
    licenseItemsList[i].addEventListener('click', function (evt) {
      evt.stopPropagation();
      sliderPopupWrapper.classList.toggle('slider-popup-wrapper--active');
      sliderPopupModal.classList.toggle('slider-popup-slide--docs');
      sliderPopupModal.appendChild(createImg(this.querySelector('img').src));
      document.addEventListener('click', closeOnOuterClick);
    });
  }
})();