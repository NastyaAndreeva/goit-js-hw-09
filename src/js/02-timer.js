import flatpickr from "flatpickr";
import Notiflix from 'notiflix';

// Additional styles import
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    dataPicker: document.querySelector('input#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    dataDays: document.querySelector('[data-days]'),
    dataHours: document.querySelector('[data-hours]'),
    dataMinutes: document.querySelector('[data-minutes]'),
    dataSeconds: document.querySelector('[data-seconds]'),
    intervalId: null,
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const date = new Date();
        if ((selectedDates[0].getTime() - date.getTime()) < 0) {
            Notiflix.Notify.failure('Please choose a date in the future');
            return;
        }
        else {
            refs.startBtn.disabled = false;
        }    
    },
  };

const result = flatpickr(refs.dataPicker, options);

refs.startBtn.disabled = true;

refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
    refs.intervalId = setInterval(()=> {
        const newDate = new Date();
        const selectedData = result.selectedDates[0];
        const timerData = selectedData.getTime() - newDate.getTime();
        if (timerData < 0) {
            clearInterval(refs.intervalId);
            return;
        }
        const convertedData = convertMs(selectedData.getTime() - newDate.getTime());
        populateDate(convertedData);
    }, 1000)
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value) {
      return String(value).padStart(2, '0');
  }

  function populateDate(config) {
    refs.dataDays.textContent = addLeadingZero(config.days);
    refs.dataHours.textContent = addLeadingZero(config.hours);
    refs.dataMinutes.textContent = addLeadingZero(config.minutes);
    refs.dataSeconds.textContent = addLeadingZero(config.seconds);
  }