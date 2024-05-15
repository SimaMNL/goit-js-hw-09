import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function addLeadingZero(value) {
  return value < 10 ? '0' + value : value;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.getElementById('start-btn');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate > currentDate) {
      startButton.removeAttribute('disabled');
    } else {
      window.alert('Please choose a date in the future');
      startButton.setAttribute('disabled', true);
    }
  },
});

startButton.addEventListener('click', () => {
  const selectedDate = new Date(datetimePicker.value).getTime();
  const currentDate = new Date().getTime();

  let difference = selectedDate - currentDate;

  if (difference <= 0) {
    window.alert('Please choose a date in the future');
    return;
  }

  startButton.setAttribute('disabled', true);

  const intervalId = setInterval(() => {
    if (difference <= 0) {
      clearInterval(intervalId);
      daysElement.textContent = '00';
      hoursElement.textContent = '00';
      minutesElement.textContent = '00';
      secondsElement.textContent = '00';
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(difference);

    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);

    difference -= 1000;
  }, 1000);
});
