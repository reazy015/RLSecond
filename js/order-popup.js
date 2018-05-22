'use strict';

window.orderPopup = (function (){
  var popupModal = document.querySelector('.popup-wrapper ');
  var popupCloseModalBtn = popupModal.querySelector('.popup-module__close');

  function closeOnOuterClick(evt){
    var target = evt.target;
    if (target.classList.contains('popup-wrapper')) {
      popupModal.classList.remove('popup-wrapper--open');
      document.body.classList.remove('no-scroll');
      document.removeEventListener('click', closeOnOuterClick);
    }
  }


  popupCloseModalBtn.addEventListener('click', function(evt) {
    evt.stopPropagation();
    popupModal.classList.remove('popup-wrapper--open');
    document.body.classList.remove('no-scroll');
    document.addEventListener('click', closeOnOuterClick);
  });
})();