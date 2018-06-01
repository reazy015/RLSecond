'use strict';

var swiper = new Swiper('.swiper-container',{
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});

// window.orderSlider = (function () {
//   var orderSlider = document.querySelector('.order-panel-slider');
//   var slidersList = orderSlider.querySelectorAll('.order-panel-slider__item');
//   var leftBtn = orderSlider.querySelector('.order-panel-slider__left');
//   var rightBtn = orderSlider.querySelector('.order-panel-slider__right')
//   var slidesCount = slidersList.length;
//   var count = 0;
//
//   function hideAllSlider() {
//     for (var i = 0; i < slidersList.length; i++) {
//       slidersList[i].classList.remove('order-panel-slider__item--active');
//     }
//   }
//
//   leftBtn.addEventListener('click', function() {
//     count--;
//     hideAllSlider();
//     if (count < 0) {
//       count = 0;
//       slidersList[count].classList.add('order-panel-slider__item--active')
//     } else {
//       slidersList[count].classList.add('order-panel-slider__item--active')
//     }
//   })
//
//   rightBtn.addEventListener('click', function() {
//     count++;
//     hideAllSlider();
//     if (count >= slidesCount) {
//       count = slidesCount - 1;
//       slidersList[count].classList.add('order-panel-slider__item--active')
//     } else {
//       slidersList[count].classList.add('order-panel-slider__item--active')
//     }
//   })
//
// })();
