'use strict';

window.menuSwitchPanel = (function () {
  var activeMarker = document.querySelector('.menu-controls-active-marker');
  var menuControlsItemList = document.querySelectorAll('.menu-controls-item');
  var menuControlsList = document.querySelector('.menu-controls-list');
  var menusExamplesList = document.querySelectorAll('.menu-example-wrapper');
  var menuControlsListTop = menuControlsList.getBoundingClientRect().top;


  function getActiveBoxCoordinates(item) {
    return {
      top: item.getBoundingClientRect().top - menuControlsListTop
    }
  }

  function deactivateAllActive() {
    for (var i = 0; i < menuControlsItemList.length; i++) {
      menuControlsItemList[i].classList.remove('menu-controls-item--active');
    }
  }

  function deactivateAllMenuExamples() {
    for (var i = 0; i < menusExamplesList.length; i++) {
      menusExamplesList[i].classList.remove('menu-example-wrapper--active');
    }
  }

  for (var i = 0; i < menuControlsItemList.length; i++) {
    menuControlsItemList[i].addEventListener('click', function() {
      var target = this.dataset.target;
      deactivateAllActive();
      deactivateAllMenuExamples();
      menusExamplesList[target].classList.add('menu-example-wrapper--active');
      this.classList.add('menu-controls-item--active');
      activeMarker.style.top = getActiveBoxCoordinates(this).top + this.offsetHeight  + 'px';
    });
  }

  activeMarker.style.top = getActiveBoxCoordinates(document.querySelector('.menu-controls-item--active')).top + 'px';
})();