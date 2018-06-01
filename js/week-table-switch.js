'use strict';

window.weekTableSwithc = (function () {
  Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() + days);
    return dat;
  }

  Date.prototype.minusDay = function(days) {
    var dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() - days);
    return dat;
  }

  var mainTable = document.querySelector('.schedule-table');
  var tableRowTimeHeader = mainTable.querySelectorAll('tr:nth-of-type(n + 2) td:first-of-type');
  var orderPopup = document.querySelector('.popup-wrapper');
  var orderPopupOrderDate = orderPopup.querySelector('.popup-module__date');
  var orderPopupOrderTime = orderPopup.querySelector('.time-input');
  var initialAvailableCells = document.querySelectorAll('.schedule-table tr:nth-of-type(n + 8) td');
  var forwardBtn = document.querySelector('.schedule-panel-date__btn--right');
  var backwardBtn = document.querySelector('.schedule-panel-date__btn--left');
  var dateInfoBlock = document.querySelector('.schedule-panel-date__info');
  var datesTableHeaders = document.querySelectorAll('.order-date');
  var shipTableToggle = document.querySelectorAll('.ship-choice-input');
  var popupModal = document.querySelector('.popup-wrapper ');
  var timeInputsList = document.querySelectorAll('.time-input');
  var timeSwitchList = document.querySelectorAll('.custom-select-variant-list');
  var mondayBlock = document.querySelector('.schedule-panel-date__info .monday');
  var sundayBlock = document.querySelector('.schedule-panel-date__info .sunday');
  var mondayHeader = mainTable.querySelector('.mon');
  var datesTableHeadersCounter = datesTableHeaders.length;
  var shipTimeSchedule = [
    ['11:00', '12:30', '14:00', '15:30', '17:00', '18:30', '20:00', '21:30', '23:00', '00:00'],
    ['10:30', '12:00', '13:30', '15:00', '16:30', '18:00', '19:30', '21:00', '22:30', '00:00']
  ];
  var monthDictionary = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль','Август', 'Сентябрь','Октябрь', 'Ноябрь'];
  var monthDictionarPopup = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля','Августа', 'Сентября','Октября', 'Ноября'];
  var daysDictionary = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];  
  var startMonday = getMonday(new Date());
  var startSunday = startMonday.addDays(6);
  var initialDate = new Date(startMonday);
  var tempDate = new Date(2018, 4, 21);

  function setTimeHeaders(index) {
    for (var i = 0; i < tableRowTimeHeader.length; i++) {
      tableRowTimeHeader[i].dataset.time = shipTimeSchedule[index][i];
      tableRowTimeHeader[i].textContent = shipTimeSchedule[index][i];      
    }
  }  

  function getMonday() {
    var d = new Date();
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); 
    return new Date(d.setDate(diff));
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
    mondayBlock.textContent = startMonday.toLocaleString().split(',')[0].slice(0,5);
    sundayBlock.textContent = startSunday.toLocaleString().split(',')[0].slice(0,5);

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
      cellsList[i].setAttribute('disabled', true);
    }      
  }

  function clearDisabledCell(cellsList) {
    for (var i = 0; i < cellsList.length; i++) {
      cellsList[i].removeAttribute('disabled');
    }
  }

  updateTableDateHeader();
  markDisabledCells(initialAvailableCells);


  forwardBtn.addEventListener('click', function() {
    var dateForward = addNextWeek();
    dateInfoBlock.textContent = monthDictionary[startMonday.getMonth()] + ' ' + dateForward.monday + ' - ' + dateForward.sunday;
    updateTableDateHeader();
  });

  backwardBtn.addEventListener('click', function() {

    if (new Date(mondayHeader.dataset.date) <= initialDate) {
      return false;
    } else {
      var dateBackward = weekBackwards(tempDate);
      dateInfoBlock.textContent = monthDictionary[startMonday.getMonth()] + ' ' + dateBackward.monday + ' - ' + dateBackward.sunday;
      updateTableDateHeader();
    }
  });

  shipTableToggle[1].addEventListener('change', function() {
      mainTable.classList.add('schedule-table--ss');
      mainTable.classList.remove('schedule-table--fs');
      setTimeHeaders(1);
      clearDisabledCell(initialAvailableCells);
      markDisabledCells(mainTable.querySelectorAll('tr:nth-of-type(n + 9) td:nth-of-type(n + 2)'));
  });

  shipTableToggle[0].addEventListener('change', function() {
    mainTable.classList.remove('schedule-table--ss');
    mainTable.classList.add('schedule-table--fs');
    setTimeHeaders(0);   
    clearDisabledCell(mainTable.querySelectorAll('tr:nth-of-type(n + 9) td:nth-of-type(n + 2)'));
    markDisabledCells(initialAvailableCells);
  });

  mainTable.addEventListener('click', function(evt) {
    evt.stopPropagation();
    var currentDate = new Date();
    var target = evt.target;
    var index = Array.prototype.indexOf.call(target.parentNode.children, target)
    var correspondingTheader = document.querySelector('.schedule-table th:nth-child(' + (index+1) + ')');
    var correspondingTime = target.parentElement.firstElementChild.dataset.time;
    var correspondingTimeHours = Number(correspondingTime.split(':')[0]);
    var correspondingTimeMinutes = Number(correspondingTime.split(':')[1]);
    var columnDate = new Date(correspondingTheader.dataset.date);
    
    if (!Boolean(target.getAttribute('disabled'))) {   

      if (currentDate.getDate() === columnDate.getDate()) {
        if (currentDate.getHours() < correspondingTimeHours) {
          onOrderHandleClick(target, columnDate, correspondingTime);
        }      
      }

      if (currentDate < columnDate) {
        onOrderHandleClick(target, columnDate, correspondingTime);
      } 
    }
  });

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