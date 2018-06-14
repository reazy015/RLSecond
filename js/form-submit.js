'use strict';

window.formSubmit = (function (){	
	var orderForm = document.querySelector('.popup-module-form');
	var sbmtBtn = orderForm.querySelector('.popup-module-form__submit');
	var userFormInputs = orderForm.querySelectorAll('.popup-module-form__input');
	var popupModule = document.querySelector('.popup-module');
	var popupModuleSuccess = document.querySelector('.popup-module-success');
  	var popupModal = document.querySelector('.popup-wrapper ');
  	var successBlock = document.querySelector('.success-block');
  	var closeSuccessBlock = successBlock.querySelector('.close-success-block');


	function clearAllInputs() {
		for (var i = 0; i < userFormInputs.length; i++) {
			userFormInputs[i].value = '';
		}
	}

	sbmtBtn.addEventListener('click', function(evt) {
		evt.preventDefault();
		popupModal.classList.remove('popup-wrapper--open');
    	successBlock.style.display = 'flex';
    	document.body.classList.remove('no-scroll');    	

    	setTimeout(function(){
    		successBlock.style.display = 'none';
    	}, 2000);
	});

	closeSuccessBlock.addEventListener('click', function() {
		successBlock.style.display = 'none';
	});

})();