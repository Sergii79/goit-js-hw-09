import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),

    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),

    timer: document.querySelector('.timer'),
    fields: document.querySelectorAll('.field'),
    dataValue: document.querySelectorAll('.value'),
}

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.startBtn.setAttribute('disabled', '');

let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] < options.defaultDate) {
            Notiflix.Notify.failure('Please choose a date in the future');
        }
        else {
          refs.startBtn.removeAttribute('disabled', '');
          selectedDate = selectedDates[0];
        }
  },
};

flatpickr(refs.input, options);

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
   
  return { days, hours, minutes, seconds };

}

function onStartBtnClick() {
        const intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = selectedDate - currentTime;
            if (deltaTime > 0) {
              const time = convertMs(deltaTime);
              updateTime(time);
            }
            else {
              clearInterval(intervalId);
            }
            
        }, 1000);
}

function updateTime({ days, hours, minutes, seconds }) {
    refs.days.textContent=`${days}`;
    refs.hours.textContent=`${hours}`;
    refs.minutes.textContent=`${minutes}`;
    refs.seconds.textContent=`${seconds}`;
}

// стилі
refs.timer.style.display = 'flex';
for (let field of refs.fields) {
  field.style.display = 'flex';
  field.style.flexDirection = 'column';
  field.style.alignItems = 'center'; 
  field.style.marginRight = '10px'; 
}
for (let value of refs.dataValue) {
    value.style.fontSize = '25px';
}