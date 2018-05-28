'use strict';

window.menuPriceList = (function() {
  var menuPriceBtn = document.querySelector('.menu-price-mobile');
  var controlsList = document.querySelector('.menu-example-controls');

  menuPriceBtn.addEventListener('click', function(evt) {
    controlsList.classList.toggle('menu-example-controls--open');
  })

})();