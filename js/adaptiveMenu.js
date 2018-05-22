'use strict';

window.adaptiveMenu = (function () {
  var mainNav = document.querySelector('.page-header-nav-wrapper');
  var menuToggleBtn = document.querySelector('.nav-toggle-btn');

  menuToggleBtn.addEventListener('click', function() {
    mainNav.classList.toggle('page-header-nav-wrapper--mobile');
    document.body.classList.toggle('no-scroll');
  })
})();