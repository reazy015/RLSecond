'use strict';

window.orderDropdown = (function (){
  var orderPanelSlidersList = document.querySelectorAll('.order-panel-slider');
  var shipInfoList = document.querySelectorAll('.order-panel-ship-info');
  var orderPanelToggleBtnsList = document.querySelectorAll('.buttons-wrapper-helper .order-toggle-button');
  var dropdownBtn = document.querySelector('.current-button-mobile');
  var submenu = document.querySelector('.buttons-wrapper-helper');

  dropdownBtn.addEventListener('click', function () {
    submenu.classList.toggle('buttons-wrapper-helper--active');
  });

  function disableAllActiveInfoBlocks() {
    for (var i = 0; i < orderPanelToggleBtnsList.length; i++) {
     orderPanelToggleBtnsList[i].classList.remove('order-toggle-button--active');
     shipInfoList[i].classList.remove('order-panel-ship-info--active');
     orderPanelSlidersList[i].classList.remove('order-panel-slider--active');
    }
  }

  function replaceMobileCurrentBtn(item) {
    dropdownBtn.replaceChild(item, dropdownBtn.firstElementChild)
  }

  for (var i = 0; i < orderPanelToggleBtnsList.length; i++) {
    orderPanelToggleBtnsList[i].addEventListener('click', function(evt) {
      disableAllActiveInfoBlocks();
      this.classList.add('order-toggle-button--active');
      shipInfoList[this.dataset.target - 1].classList.add('order-panel-ship-info--active');
      orderPanelSlidersList[this.dataset.target - 1].classList.add('order-panel-slider--active');
    });
  }

  console.log(orderPanelToggleBtnsList, shipInfoList);
})();