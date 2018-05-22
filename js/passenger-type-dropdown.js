'use strict';

window.passengerBox = ( function() {
  var passengerType = document.querySelector('.passenger-info-block');
  var passengerTypeInput = passengerType.querySelector('.passenger-type-input');
  var passengerTypeInputVariantList = passengerTypeInput.querySelector('.custom-select-variant-list--passenger');
  var passengerContainer = document.querySelector('.passenger-container');
  var passengerAddBtn = document.querySelector('.add-passenger-btn');
  var orderPriceElement = document.querySelector('.order-price__number');
  var allDayCheckboxInput = document.querySelector('input[name="allday"]');
  var passengersCounter = 1;

  function openPassengerTypeDropDown() {
    this.querySelector('.custom-select-variant-list').classList.toggle('custom-select-variant-list--open');
  }

  function deletePassenger() {
    passengersCounter--;
    this.parentElement.parentElement.removeChild(this.parentElement);
    updateTotalPrice();
  }

  function getPassengerTypeUpdatePrice(evt) {
    if (evt.target.classList.contains('variant-list-item') && !allDayCheckboxInput.checked) {
      this.parentElement.firstElementChild.value = evt.target.textContent;
      this.parentElement.firstElementChild.dataset.price = evt.target.dataset.price;
      this.parentElement.parentElement.parentElement.querySelector('.passenger-tickect-price__number').textContent = evt.target.dataset.price;
      updateTotalPrice();
    }
  }

  function createPassengerTypeInputElement() {
    passengersCounter++;
    var baseBlock = passengerType.cloneNode(true);
    var inputBlock = passengerTypeInput.cloneNode(true);
    var inputVariantsList = inputBlock.querySelector('.custom-select-variant-list')
    var deletePassengerBtn = document.createElement('i');
    deletePassengerBtn.classList.add('fas', 'fa-times', 'delete-passenger');
    inputBlock.classList.add('passenger-info-block-animate');

    inputBlock.addEventListener('click', openPassengerTypeDropDown);
    deletePassengerBtn.addEventListener('click', deletePassenger);
    inputVariantsList.addEventListener('click', getPassengerTypeUpdatePrice);


    baseBlock.replaceChild(inputBlock, baseBlock.children[1]);
    baseBlock.appendChild(deletePassengerBtn);
    baseBlock.querySelector('.passenger-number__number').textContent = passengersCounter;
    return baseBlock;
  }

  function updateTotalPrice() {
    var allPassengersPrice = document.querySelectorAll('.passenger-tickect-price__number');
    var totalPrice = 0;

    for (var i = 0; i < allPassengersPrice.length; i++){
      totalPrice = totalPrice + Number.parseFloat(allPassengersPrice[i].textContent);
    }

    orderPriceElement.textContent = totalPrice;
  }

  function updateAlldayPrice() {
    var allPassengersPrice = document.querySelectorAll('.passenger-tickect-price__number');

    for (var i = 0; i < allPassengersPrice.length; i++){
      allPassengersPrice[i].textContent = 1000;
    }
  }

  function returnOldPrices() {
    var allPassengersPrice = document.querySelectorAll('.passenger-tickect-price__number');
    var allPassnegersTypeInputs = document.querySelectorAll('input[name="passenger-type"]');

    for (var i = 0; i < allPassnegersTypeInputs.length; i++){
      allPassengersPrice[i].textContent = allPassnegersTypeInputs[i].dataset.price;
    }
  }

  passengerAddBtn.addEventListener('click', function(evt) {
    passengerContainer.appendChild(createPassengerTypeInputElement());
    updateTotalPrice();
  });

  allDayCheckboxInput.addEventListener('change', function() {
    if (this.checked) {
      updateAlldayPrice();
      updateTotalPrice();
    }

    if (!this.checked) {
      returnOldPrices();
      updateTotalPrice();
    }
  });

  passengerTypeInput.addEventListener('click', openPassengerTypeDropDown);

  passengerTypeInputVariantList.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('variant-list-item') && !allDayCheckboxInput.checked) {
      this.parentElement.firstElementChild.value = evt.target.textContent;
      this.parentElement.firstElementChild.dataset.price = evt.target.dataset.price;
      this.parentElement.parentElement.parentElement.querySelector('.passenger-tickect-price__number').textContent = evt.target.dataset.price;
      updateTotalPrice();
    }
  });

})();
