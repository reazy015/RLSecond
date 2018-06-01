'use strict';

window.adaptiveMenu = (function () {
  var mainNav = document.querySelector('.page-header-nav-wrapper');
  var menuToggleBtn = document.querySelector('.nav-toggle-btn');
  var menuItemsList = document.querySelectorAll('.header-nav-list-item');

  menuToggleBtn.addEventListener('click', function() {
    mainNav.classList.toggle('page-header-nav-wrapper--mobile');
    document.body.classList.toggle('no-scroll');
  });

  function disableAllActive() {
  	for (var i = 0; i < menuItemsList.length; i++) {
  		menuItemsList[i].classList.remove('header-nav-list-item--active');
  	}
  }

  for (var i = 0; i < menuItemsList.length; i++) {
  	menuItemsList[i].addEventListener('click', function() {
  		disableAllActive();
  		this.classList.add('header-nav-list-item--active');  		
  	});
  }

})();