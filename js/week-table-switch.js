'use strict';

window.weekTableSwithc = (function () {
  var mainTable = document.querySelector('.schedule-table');
  var orderPopup = document.querySelector('.popup-wrapper');
  var orderPopupOrderDate = orderPopup.querySelector('.popup-module__date');
  var orderPopupOrderTime = orderPopup.querySelector('.time-input');
  var initialAvailableCells = document.querySelectorAll('.schedule-table tr:nth-of-type(n + 19) td');
  var forwardBtn = document.querySelector('.schedule-panel-date__btn--right');
  var backwardBtn = document.querySelector('.schedule-panel-date__btn--left');
  var dateInfoBlock = document.querySelector('.schedule-panel-date__info');
  var datesTableHeaders = document.querySelectorAll('.order-date');
  var shipTableToggle = document.querySelectorAll('.ship-choice-input');
  var popupModal = document.querySelector('.popup-wrapper ');
  var timeInputsList = document.querySelectorAll('.time-input');
  var timeSwitchList = document.querySelectorAll('.custom-select-variant-list');
  var datesTableHeadersCounter = datesTableHeaders.length;
  var monthDictionary = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль','Август', 'Сентябрь','Октябрь', 'Ноябрь'];
  var monthDictionarPopup = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля','Августа', 'Сентября','Октября', 'Ноября'];
  var daysDictionary = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  var startMonday = new Date(2018, 4, 21);
  var startSunday = new Date(2018, 4, 27);
  var INITIAL_DATE = new Date(2018, 4, 21);
  var tempDate = new Date(2018, 4, 21);

  Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() + days);
    return dat;
  }

  function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
      dateArray.push(currentDate)
      currentDate = currentDate.addDays(1);
    }
    return dateArray;
  }

  function closeOnOuterClick(evt){
    var target = evt.target;
    if (target.classList.contains('popup-wrapper')) {
      popupModal.classList.remove('popup-wrapper--open');
      document.body.classList.remove('no-scroll');
      document.removeEventListener('click', closeOnOuterClick);
    }
  }

  function closeOnEscBtn(evt) {
    if (evt.keyCode === 27) {
      popupModal.classList.remove('popup-wrapper--open');
      document.body.classList.remove('no-scroll');
    }
  }

  function addNextWeek() {
    startMonday.setDate(startMonday.getDate() + 7);
    var monday = startMonday.toLocaleString();
    startSunday.setDate(startSunday.getDate() + 7);
    var sunday = startSunday.toLocaleString();


    return {
      monday: monday.split(',')[0].slice(0,5),
      sunday: sunday.split(',')[0].slice(0,5)
    }
  }

  function weekBackwards() {
    startMonday.setDate(startMonday.getDate() - 7);
    var monday = startMonday.toLocaleString();
    startSunday.setDate(startSunday.getDate() - 7);
    var sunday = startSunday.toLocaleString();


    return {
      monday: monday.split(',')[0].slice(0,5),
      sunday: sunday.split(',')[0].slice(0,5)
    }
  }

  function updateTableDateHeader() {
    var selectedWeekDates = getDates(startMonday, startSunday);
    for (var i = 0; i < datesTableHeadersCounter; i++) {
      datesTableHeaders[i].textContent = selectedWeekDates[i].toLocaleString().split(',')[0].slice(0,5)
      datesTableHeaders[i].offsetParent.dataset.date = selectedWeekDates[i];
    }
  }

  function onOrderHandleClick(item, date, time) {
    if (item) {
      if (!item.dataset.disable) {
        orderPopup.classList.add('popup-wrapper--open');
        document.body.classList.add('no-scroll');
        orderPopupOrderDate.textContent = daysDictionary[date.getDay()] + ', ' + date.getDate() + ' ' + monthDictionarPopup[date.getMonth()];
        orderPopupOrderTime.value = time;
      }
    }  else {
      document.body.classList.add('no-scroll');
      orderPopup.classList.add('popup-wrapper--open');
    }
    document.addEventListener('click', closeOnOuterClick);
  }

  function markDisabledCells(cellsList) {
    for (var i = 0; i < cellsList.length; i++) {
      cellsList[i].dataset.disable = '1';
    }
  }

  updateTableDateHeader(startMonday, startSunday);
  markDisabledCells(initialAvailableCells);

  forwardBtn.addEventListener('click', function() {
    var dateForward = addNextWeek();
    dateInfoBlock.textContent = monthDictionary[startMonday.getMonth()] + ' ' + dateForward.monday + ' - ' + dateForward.sunday;
    updateTableDateHeader();
  });
  backwardBtn.addEventListener('click', function() {
    if (startMonday <= INITIAL_DATE) {
      return false;
    } else {
      var dateBackward = weekBackwards(tempDate);
      dateInfoBlock.textContent = monthDictionary[startMonday.getMonth()] + ' ' + dateBackward.monday + ' - ' + dateBackward.sunday;
      updateTableDateHeader();
    }
  });
  shipTableToggle[1].addEventListener('change', function() {
      mainTable.classList.add('schedule-table--ss');
      markDisabledCells(document.querySelectorAll('.schedule-table--ss tr:nth-of-type(n + 10) td'));
  });
  shipTableToggle[0].addEventListener('change', function() {
    mainTable.classList.remove('schedule-table--ss')
    markDisabledCells(initialAvailableCells);
  });
  mainTable.addEventListener('click', function(evt) {
    evt.stopPropagation();
    var currentDate = new Date();
    var target = evt.target;
    var index = Array.prototype.indexOf.call(target.parentNode.children, target)
    var corresponding_th = document.querySelector('.schedule-table th:nth-child(' + (index+1) + ')');
    var corresponding_time = target.parentElement.firstElementChild.dataset.time;
    var columnDate = new Date(corresponding_th.dataset.date);
    if (currentDate < columnDate) {
      onOrderHandleClick(target, columnDate, corresponding_time);
    } else {
      console.log(false);
    }
  })
  document.addEventListener('keyup', closeOnEscBtn);
  document.querySelector('.page-header__callback').addEventListener('click', function() {
    onOrderHandleClick();
  });
  document.querySelector('.order-panel__buy').addEventListener('click', function() {
    onOrderHandleClick();
  });
  timeSwitchList[0].addEventListener('click', function(evt) {
    var target = evt.target;
    timeInputsList[0].value = target.dataset.time;
    this.classList.remove('begin-time-variants-list--open');
  });

})();
