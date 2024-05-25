import flatpickr from 'flatpickr';

const datePicker = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  minuteIncrement: 1,
  onClose: function (selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate && selectedDate > new Date()) {
      document.getElementById('start-btn').removeAttribute('disabled');
    } else {
      document.getElementById('start-btn').setAttribute('disabled', true);
      if (!selectedDate) {
        window.alert('Please choose a valid date.');
      } else {
        window.alert('Please choose a date in the future.');
      }
    }
  },
});

document.getElementById('start-btn').addEventListener('click', function () {
  const endDate = datePicker.selectedDates[0];

  const countdownInterval = setInterval(function () {
    const now = new Date();
    const difference = endDate - now;

    if (difference <= 0) {
      clearInterval(countdownInterval);
      document.querySelectorAll('.value').forEach(function (el) {
        el.textContent = '00';
      });
      window.alert('Countdown finished!');
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(difference);
    document.querySelector('[data-days]').textContent = String(days).padStart(
      2,
      '0'
    );
    document.querySelector('[data-hours]').textContent = String(hours).padStart(
      2,
      '0'
    );
    document.querySelector('[data-minutes]').textContent = String(
      minutes
    ).padStart(2, '0');
    document.querySelector('[data-seconds]').textContent = String(
      seconds
    ).padStart(2, '0');
  }, 1000);
});
