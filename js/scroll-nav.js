'use strict';

document.scrollNav = ( function() {
	var mainHeader = document.querySelector('.page-header');
	var headerNav = document.querySelector('.scroll-nav');
	var scrollNavBreakpoint = headerNav.offsetHeight + headerNav.offsetTop;
	var mainHeaderTopPadding = Number(getComputedStyle(mainHeader).paddingTop.replace(/[px]/g, ''));
	var mainHeaderInitialPadding = getComputedStyle(mainHeader).paddingTop;
	var initialHeaderHeight = document.querySelector('.page-header-top-wrapper').offsetHeight;


	window.addEventListener('scroll', function() {
		if (window.pageYOffset > scrollNavBreakpoint) {
			headerNav.classList.add('scroll-nav--fixed');
			console.log(headerNav.offsetHeight, mainHeaderInitialPadding);
			mainHeader.style.paddingTop = initialHeaderHeight  + mainHeaderTopPadding + 'px';			
		} else {
			headerNav.classList.remove('scroll-nav--fixed');
			mainHeader.style.paddingTop = mainHeaderInitialPadding;
		}
	});

})();