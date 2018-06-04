'use strict';

window.preloader = (function () {
	window.onload = function() {
		setTimeout(function() {
			document.querySelector('.preloader').classList.add('preloader--fadeout');
			document.querySelector('.page').classList.remove('page-loading');
		}, 3005);
	}
})();