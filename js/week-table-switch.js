'use strict';

window.weekTableSwitch = (function () {
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

  Date.prototype.addHour = function(h) {
    this.setHours(this.getHours() + h);
    return this;
  }

  var mainTable = document.querySelector('.schedule-table');
  var tableRowTimeHeader = mainTable.querySelectorAll('tr:nth-of-type(n + 2) td:first-of-type');
  var orderPopup = document.querySelector('.popup-wrapper');
  var orderPopupOrderDate = orderPopup.querySelector('.popup-module__date');
  var initialAvailableCells = document.querySelectorAll('.schedule-table tr:nth-of-type(n + 8) td');
  var forwardBtn = document.querySelector('.schedule-panel-date__btn--right');
  var backwardBtn = document.querySelector('.schedule-panel-date__btn--left');
  var dateInfoBlock = document.querySelector('.schedule-panel-date__info');
  var datesTableHeaders = document.querySelectorAll('.order-date');
  var orderSumInput = document.querySelector('.order-price__sum');
  var shipTableToggle = document.querySelectorAll('.ship-choice-input');
  var popupModal = document.querySelector('.popup-wrapper ');
  var timeInputsList = document.querySelectorAll('.time-input');
  var timeSwitchList = document.querySelectorAll('.custom-select-variant-list');
  var mondayBlock = document.querySelector('.schedule-panel-date__info .monday');
  var sundayBlock = document.querySelector('.schedule-panel-date__info .sunday');
  var mondayHeader = mainTable.querySelector('.mon');
  var datesTableHeadersCounter = datesTableHeaders.length;
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

  function createTimeListItem(time, nextDay, date) {
    var listElement = document.createElement('li');
    var listElementText = document.createElement('span');

    console.log(nextDay);

    if (time < 10) {
      listElementText.textContent = '0' + time + ':00';     
    } else {
      listElementText.textContent = time + ':00';
    }

    if (nextDay) {
      var day = date.getDate();
      var month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMoth();

      listElementText.textContent += ' ' + day + '.' + month;
    }

    listElement.classList.add('variant-list-item');
    listElement.setAttribute('data-time', listElementText.textContent);
    listElement.setAttribute('data-date', date);
    listElement.append(listElementText);

    return listElement;
  }

  function setEndTimeList(beginTime, date) {
    var initialDate = new Date(date);
    var beginTimeHour = beginTime.replace(/[0:]/g, '');
    date.setHours(beginTimeHour);
   

    for (var i = 0; i < 24; i++) {
      

      if (initialDate.getDate() < date.getDate()) {
        timeSwitchList[1].appendChild(createTimeListItem(date.getHours(), true, date));
      } else {
        timeSwitchList[1].appendChild(createTimeListItem(date.getHours(), false, date));
      }  

      date.addHour(1);    
    }    
  }

  function setBeginTimeList(date) {
    var initialDate = new Date(date);
    initialDate.setMinutes(0);
   
    for (var i = 0; i < 24; i++) {
      initialDate.setHours(i);
      timeSwitchList[0].appendChild(createTimeListItem(i, undefined, initialDate));
    }
  }

  function formatEndTime(date) {
    var hours = (new Date(date)).getHours();

    if (hours < 10) {
      return '0' + hours + ':00';
    } else {
      return hours + ':00';
    }
  }

  function removeEndTimeList(elem) {
    while(elem.firstElementChild) {
      elem.removeChild(elem.firstElementChild);
    }
  }

  function onOrderHandleClick(item, date, time) {
    if (item) {
      if (!item.dataset.disable) {        
        var beginTimeDatasetValue = new Date(date.setHours(time.replace(/[0:]/g, '')));
        var endTimeDatasetValue = new Date(date.setHours(time.replace(/[0:]/g, '')));
        endTimeDatasetValue.addHour(1);
        beginTimeDatasetValue.setMinutes(0);
        endTimeDatasetValue.setMinutes(0);                 

        orderPopup.classList.add('popup-wrapper--open');
        document.body.classList.add('no-scroll');
        orderPopupOrderDate.textContent = daysDictionary[date.getDay()] + ', ' + date.getDate() + ' ' + monthDictionarPopup[date.getMonth()];
        timeInputsList[0].setAttribute('data-date', beginTimeDatasetValue);
        timeInputsList[1].setAttribute('data-date', endTimeDatasetValue);
        timeInputsList[0].value = time;
        timeInputsList[1].value = formatEndTime(endTimeDatasetValue);
        orderSumInput.setAttribute('data-price', document.querySelector('.ship-choice-input:checked').dataset.price);
        orderSumInput.value = document.querySelector('.ship-choice-input:checked').dataset.price;
        
        setBeginTimeList(date);
        setEndTimeList(timeInputsList[1].value, endTimeDatasetValue);

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

  function calculateFinalOrderSum(endTime, beginTime) {
    endTime = new Date(endTime);
    beginTime = new Date(beginTime);
    var result = new Date(endTime.getTime() - beginTime.getTime());
    result = result.getUTCHours();
   
    orderSumInput.value = Number(result) * Number(orderSumInput.dataset.price);
    console.log(result);
    return result;
  }

  updateTableDateHeader();


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

  mainTable.addEventListener('click', function(evt) {
    evt.stopPropagation();
    var currentDate = new Date();
    var target = evt.target;
    var index = Array.prototype.indexOf.call(target.parentNode.children, target)
    var correspondingTheader = document.querySelector('.schedule-table th:nth-child(' + (index + 1) + ')');
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
    var event = new Event('change');
    timeInputsList[0].value = target.dataset.time;
    timeInputsList[0].setAttribute('data-date', target.dataset.date);


    this.dispatchEvent(event);
  }); 

  timeSwitchList[0].addEventListener('change', function() {
    var initialDate = new Date(timeInputsList[0].dataset.date);
    initialDate.addHour(1);

    timeInputsList[1].value = formatEndTime(initialDate);
    timeInputsList[1].dataset.date = initialDate;
    removeEndTimeList(timeSwitchList[1]);
    setEndTimeList(timeInputsList[1].value, initialDate);

    calculateFinalOrderSum(timeInputsList[1].dataset.date, timeInputsList[0].dataset.date); 
  });

  timeSwitchList[1].addEventListener('click', function(evt) {    
    var target = evt.target;
    timeInputsList[1].value = target.dataset.time; 
    timeInputsList[1].setAttribute('data-date', target.dataset.date);

    calculateFinalOrderSum(timeInputsList[1].dataset.date, timeInputsList[0].dataset.date);
  });  

})();