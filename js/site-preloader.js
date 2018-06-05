'use strict';

window.preloader = (function () {
	window.onload = function() {
		setTimeout(function() {
			document.querySelector('.preloader').classList.add('preloader--fadeout');
			document.querySelector('.page').classList.remove('page-loading');

			setTimeout(function() {
				document.querySelector('.preloader').style.display = 'none';
			}, 700);
		}, 1500);
	}
})();