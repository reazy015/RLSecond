'use strict';

document.scrollNav = ( function() {
	var headerNav = document.querySelector('.scroll-nav');
	var scrollNavBreakpoint = headerNav.offsetHeight + headerNav.offsetTop;


	window.addEventListener('scroll', function() {
		if (window.pageYOffset > scrollNavBreakpoint) {
			headerNav.classList.add('scroll-nav--fixed');
			document.body.style.paddingTop = scrollNavBreakpoint + 'px';
		} else {
			headerNav.classList.remove('scroll-nav--fixed');
			document.body.style.paddingTop = 0;
		}
	});

})();